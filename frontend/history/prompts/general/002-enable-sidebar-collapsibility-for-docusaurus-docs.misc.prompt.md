---
id: 002
title: Enable Sidebar Collapsibility for Docusaurus Docs
stage: misc
date: 2025-11-29
surface: agent
model: gemini-1.5-pro
feature: none
branch: main
user: LAPTOPWALE
command: "the @docs** folder has some folders like @docs\hardware** and it has @docs\hardware\conclusion** folder inside so like a tree so when i read this book i am unable to see any arrow etc to close open the chapter? can you just fix it?"
response_text: "Enabled sidebar collapsibility for Docusaurus documentation categories by adding `collapsible: true` and `collapsed: false` to all top-level `_category_.json` files. Additionally, comprehensive styling was added to `src/css/custom.css` to ensure correct visibility and aesthetics of the sidebar in the dark theme, including background, text, link, and hover states."
labels: ["docusaurus", "sidebar", "collapsible", "bug-fix", "styling"]
links: null
files_yaml:
  - docs/hardware/_category_.json
  - docs/humanoid-robotics/_category_.json
  - docs/isaac-platform/_category_.json
  - docs/physical-ai/_category_.json
  - docs/ros2/_category_.json
  - docs/simulation/_category_.json
  - docs/vla/_category_.json
  - src/css/custom.css
tests_yaml: null
---
Enabled sidebar collapsibility for Docusaurus documentation categories by adding `collapsible: true` and `collapsed: false` to all top-level `_category_.json` files. Additionally, comprehensive styling was added to `src/css/custom.css` to ensure correct visibility and aesthetics of the sidebar in the dark theme, including background, text, link, and hover states.