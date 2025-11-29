// src/theme/Layout/index.tsx
import React, { type ReactNode } from 'react';
import Layout from '@theme-original/Layout';
import type LayoutType from '@theme/Layout';
import type { WrapperProps } from '@docusaurus/types';
import {ChatProvider} from '@site/src/context/ChatKitContext';
import MainHome from '@site/src/components/HomepageFeatures/Home';

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): ReactNode {
  return (
    <>

      <Layout {...props} />
        <ChatProvider>
              <MainHome />
            </ChatProvider>    </>
  );
}