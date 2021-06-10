import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Investment from '../components/Investment';
import InvestmentGeneralInfo from '../components/InvestmentGeneralInfo';
import Investments from '../components/Investments';
import Main from '../components/Main';
import {
  getInvestments,
  getReportsByInvestmentId,
  getTotalPerformanceByInvestmentId,
} from '../services/investmentsApi';

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    setInvestments(getInvestments());
  }, []);

  return (
    <>
      <Header>React - Investments v1.0.1</Header>
      <Main>
        {investments.map(({ id, description }) => {
          return (
            <Investments key={id}>
              <h2 className="text-center text-lg font-semibold mt-1">
                {description}
              </h2>
              <InvestmentGeneralInfo>
                {getTotalPerformanceByInvestmentId(id)}
              </InvestmentGeneralInfo>

              {getReportsByInvestmentId(id).map(report => {
                return <Investment key={report.id}>{report}</Investment>;
              })}
            </Investments>
          );
        })}
      </Main>
    </>
  );
}
