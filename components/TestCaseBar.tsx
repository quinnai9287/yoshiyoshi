import { Flex, Button } from 'antd';
import React from "react";
import { TestCaseType } from '../types/types';
import { AllTestCases } from '../data/TestCases';

type TestCaseBarProps = {
  currentTest: TestCaseType;
  setCurrentTest: (testCase: TestCaseType) => void;
}

const TestCaseBar: React.FC<TestCaseBarProps> = ({ currentTest, setCurrentTest }) => {
    return (
        <Flex gap={8}>
            {
                AllTestCases.map((testCase:TestCaseType, index:number) => {
                    return (
                        <Button 
                            key={index} 

                            onClick={()=>{
                                console.log('[TestCaseBar]', testCase);
                                setCurrentTest(testCase)
                            }}
                        >
                            {`testCase ${index+1}`}
                        </Button>
                    )
                })
            }
        </Flex>
    );
};
export default TestCaseBar;
