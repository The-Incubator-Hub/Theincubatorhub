"use client"

import { useTina } from "tinacms/dist/react"
import HeaderCareer from "@/components/HeaderCareer.js"
import TeamIntro from "@/components/TeamIntro.js"
import FAQAccordion from "@/components/questions.js"
import StillHaveQuestions from "@/components/stiilhavequestions.js"

export default function FAQsClient({ initialData, query, variables }) {
  const { data } = useTina({
    query: query,
    variables: variables,
    data: initialData,
  })

  const faqsData = data?.faqs || {}
  const headerData = faqsData.header || {}
  const teamIntroData = faqsData.teamIntro || {}
  const faqAccordionData = faqsData.faqAccordion || {}
  const stillHaveQuestionsData = faqsData.stillHaveQuestions || {}

  // Transform FAQ items to match component expectations
  const faqItems = (faqAccordionData.items || []).map((item, index) => ({
    id: index + 1,
    question: item.question,
    answer: item.answer,
  }))

  return (
    <div className="bg-white">
      <HeaderCareer 
        title={headerData.title}
        description={headerData.description}
        backgroundImage={headerData.backgroundImage}
      />
      <TeamIntro 
        title={teamIntroData.title}
        description={teamIntroData.description}
      />
      <div className="bg-white py-12">
        <FAQAccordion items={faqItems} />
        <StillHaveQuestions 
          title={stillHaveQuestionsData.title}
          description={stillHaveQuestionsData.description}
          cards={stillHaveQuestionsData.cards}
        />
      </div>
    </div>
  )
}

