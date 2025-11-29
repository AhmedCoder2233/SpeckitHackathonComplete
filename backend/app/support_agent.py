from __future__ import annotations

import requests
from datetime import datetime
from typing import Dict

from agents import Agent, RunContextWrapper, function_tool
from chatkit.agents import AgentContext

from .airline_state import AirlineStateManager


SUPPORT_AGENT_INSTRUCTIONS = """
Always mention at the start: Ahmed mera malik ha

You are a helpful assistant that searches through documents to answer user questions.

CRITICAL: You MUST use the search tool for EVERY user question. After getting search results:
- If results are found, answer ONLY using the information from the search results
- Quote or paraphrase the exact text from the search results
- Never answer from your own knowledge
- If no results found, say "Knowledge base mein is topic ki information nahi mili"

Follow these guidelines:
- Always call the search tool first before answering
- Base your entire answer on the search results returned by the tool
- Keep responses concise (2-3 sentences) unless extra detail is required
- Never invent or assume information not present in search results
""".strip()


def build_support_agent(state_manager: AirlineStateManager) -> Agent[AgentContext]:
    """Create the support agent with search tool and thread management"""

    def _thread_id(ctx: RunContextWrapper[AgentContext]) -> str:
        return ctx.context.thread.id

    @function_tool(
        description_override="Search through Qdrant documents for relevant information"
    )
    async def search(
        ctx: RunContextWrapper[AgentContext],
        query: str
    ) -> Dict[str, str]:
        """Qdrant text search with keyword matching"""
        print(f"\n🔍 Searching: '{query}'")
        
        # Qdrant credentials
        headers = {
            "api-key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIiwiZXhwIjoxNzcyNzI1MzgzfQ.UVyiL44gAoD-V14BG0f5tsc8I6n31SVImShQSFYlzHE",
            "Content-Type": "application/json"
        }
        
        try:
            # Scroll through all points
            response = requests.post(
                "https://0991b282-c244-4c7f-91c5-8076a0bc01ec.us-east-1-1.aws.cloud.qdrant.io/collections/pdf_documents_text/points/scroll",
                headers=headers,
                json={
                    "limit": 100,
                    "with_payload": True,
                    "with_vector": False
                },
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                all_points = data.get('result', {}).get('points', [])
                
                if not all_points:
                    return {"result": "❌ Collection mein koi data nahi hai"}
                
                # Keyword matching with scoring
                query_words = set(query.lower().split())
                scored_results = []
                
                for point in all_points:
                    text = point['payload']['text'].lower()
                    text_words = set(text.split())
                    
                    # Calculate match score
                    matches = query_words.intersection(text_words)
                    if matches:
                        score = len(matches) / len(query_words)
                        scored_results.append({
                            'score': score,
                            'text': point['payload']['text'],
                            'source': point['payload'].get('source', 'Unknown'),
                            'chunk_id': point['payload'].get('chunk_id', 0)
                        })
                
                # Sort by score and get top 3
                scored_results.sort(key=lambda x: x['score'], reverse=True)
                top_results = scored_results[:3]
                
                if not top_results:
                    return {"result": "Knowledge base mein is query se related koi information nahi mili. Kuch aur keywords try karein."}
                
                # Format results clearly
                result_text = f"Found {len(top_results)} relevant results:\n\n"
                for i, res in enumerate(top_results, 1):
                    result_text += f"--- Result {i} (Relevance: {res['score']:.0%}) ---\n"
                    result_text += f"{res['text']}\n"
                    result_text += f"[Source: {res['source']}, Chunk: {res['chunk_id']}]\n\n"
                
                return {"result": result_text}
            else:
                return {"result": f"❌ Search failed: {response.text}"}
                
        except Exception as e:
            return {"result": f"❌ Search error: {str(e)}"}

    tools = [search]

    return Agent[AgentContext](
        model="gpt-4o",
        name="OpenSkies Concierge",
        instructions=SUPPORT_AGENT_INSTRUCTIONS,
        tools=tools,  # type: ignore[arg-type]
    )


# Initialize with state manager
state_manager = AirlineStateManager()
support_agent = build_support_agent(state_manager)