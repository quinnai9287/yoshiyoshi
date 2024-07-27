"use client"
import React, { useState } from "react";
import { Flex } from 'antd';
import Booking from "../components/Booking";
import TestCaseBar from "../components/TestCaseBar";
import { AllTestCases } from '../data/TestCases';

const Home: React.FC= () => {
  const [currentTest, setCurrentTest] = useState(AllTestCases[0]);

  return (
    <Flex vertical gap="large" align="center">
      <h1 className="text-3xl font-bold">YOSHI YOSHI</h1>
      <TestCaseBar currentTest={currentTest} setCurrentTest={setCurrentTest} />
      <Booking currentTest={currentTest} />
    </Flex>
  );
};
export default Home;
