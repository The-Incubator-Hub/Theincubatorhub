'use client';

import HeaderCareer from "@/components/HeaderCareer.js";
import TeamIntro from "@/components/TeamIntro.js";
import FAQAccordion from "@/components/questions.js";
import StillHaveQuestions from "@/components/stiilhavequestions.js";
export default function Page() { 
  return (   
    <div className="bg-white">  
      <HeaderCareer />  
      <TeamIntro />       
      <div className="bg-white py-12">   
        <FAQAccordion />   
        <StillHaveQuestions />  
      </div>  
    </div>  
  );  
}   

