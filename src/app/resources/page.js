'use client';

import LearningResources from "@/components/learning.js"
import ViewResources from "@/components/ViewResources.js"
import JoinUs from "@/components/JoinUs.js"

export default function Page() {
    return (
      <div>
        <LearningResources /> 
        <ViewResources />
        <JoinUs />
      </div>
    );
  }
