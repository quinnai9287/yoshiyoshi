"use client"
import React, { useState } from "react";
import { Button, Flex } from 'antd';
import Booking from "../components/Booking";
import TestCaseBar from "../components/TestCaseBar";
import { AllTestCases } from '../data/TestCases';

const Home: React.FC= () => {
  const [currentTest, setCurrentTest] = useState(AllTestCases[0]);
  const [isCheapestPlan, setIsCheapestPlan] = useState(false);

  return (
    <Flex vertical gap="large" align="center">
      <h1 className="text-3xl font-bold">YOSHI YOSHI</h1>
      <Flex gap={8} align="center">
        <p className="text-sm">Now Plan:</p>
        <Button 
          onClick={()=>setIsCheapestPlan(true)} 
          type={ isCheapestPlan ? 'primary': 'default'}
        >
            Get Cheapest Plan
        </Button>
        <Button 
          onClick={()=>setIsCheapestPlan(false)} 
          type={ !isCheapestPlan ? 'primary': 'default'}
        >
            Custom Plan
        </Button>
      </Flex>
      <TestCaseBar currentTest={currentTest} setCurrentTest={setCurrentTest} />
      <Booking currentTest={currentTest} isCheapestPlan={isCheapestPlan} />
    </Flex>
  );
};
export default Home;
