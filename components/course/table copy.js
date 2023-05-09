import { memo, useId } from 'react';
import TableHeader from './table-header';
import TableRow from './table-row';
import AttemptQuizHeader from './attemptQuizHeader';
import { modules } from '../../utils/course-map';
import { useAppDispatch, useAppState } from '../../context/AppContext';
import { loadCourse } from '../../lib/load-course';

function Table({ showQuiz, quizId }) {
  const appState = useAppState();

  useEffect(() => {
    const data = loadCourse();
  });

  return (
    <div className="mx-auto my-20 flex max-w-4xl flex-col gap-10">
      <div>
        <TableHeader ready title="Introduction" subTitle="Module 1" />
        {modules[0].map((item, index) => {
          return <TableRow ready item={item} index={index} key={index} />;
        })}
      </div>

      <div>
        <TableHeader ready title="BNB Chain Ecosystem" subTitle="Module 2" />

        {modules[1].map((item, index) => {
          return <TableRow ready item={item} index={index} key={index} />;
        })}
      </div>

      <div>
        <TableHeader ready title="BNB Chain Architecture" subTitle="Module 3" />

        {modules[2].map((item, index) => {
          return <TableRow ready item={item} index={index} key={index} />;
        })}
      </div>

      <div>
        <TableHeader ready title="BNB Chain Dev Tools" subTitle="Module 4" />

        {modules[3].map((item, index) => {
          return <TableRow ready item={item} index={index} key={index} />;
        })}
      </div>

      <div>
        <TableHeader ready title="Introduction to Smart Contracts" subTitle="Module 5" />

        {modules[4].map((item, index) => {
          return <TableRow ready item={item} index={index} key={index} />;
        })}
      </div>

      <div>
        <TableHeader ready title="Smart Contract Development on BNB Chain" subTitle="Module 6" />

        {modules[5].map((item, index) => {
          return <TableRow ready item={item} index={index} key={index} />;
        })}
      </div>

      <div>
        <TableHeader ready title="Interacting with Deployed Smart Contracts" subTitle="Module 7" />

        {modules[6].map((item, index) => {
          return <TableRow ready item={item} index={index} key={index} />;
        })}
      </div>

      <div>
        <TableHeader ready title="Tokenization" subTitle="Module 8" />

        {modules[7].map((item, index) => {
          return <TableRow ready item={item} index={index} key={index} />;
        })}
      </div>

      <div>
        <TableHeader ready title="Bridging Web2 to Web3" subTitle="Module 9" />

        {modules[8].map((item, index) => {
          return <TableRow ready item={item} index={index} key={index} />;
        })}
      </div>

      <div>
        <TableHeader ready title="Future of BNB Chain" subTitle="Module 10" />

        {modules[9].map((item, index) => {
          return <TableRow ready item={item} index={index} key={index} />;
        })}
      </div>
      {/*       {appState.publicKey && (
        <div>
          <AttemptQuizHeader showQuiz={showQuiz} link={`/course/quiz/attempt/${quizId}`} />
        </div>
      )}
 */}
    </div>
  );
}

export default memo(Table);
