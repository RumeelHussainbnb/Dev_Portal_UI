import { useState } from 'react';
import axios from '../../utils/http';
import { Container } from '../../components/layout';
import Pagination from '../../components/pagination/Pagination';

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/status`);
  return { props: data };
}

export default function Contents({ data }) {
  let { statusactive } = data;
  let { statusinactive } = data;
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const handlePageChange = async (page, tableType) => {
    console.log('page ==> ', page);
    console.log('tableType ==> ', tableType);
    //setPage(newPage.selected + 1);
    // try {
    //   const response = await axios.get(
    //     `/martian/martianActivity?pageNumber=${
    //       newPage.selected + 1
    //     }&limit=${perPage}&id=${'63a464bcf290584bd478452a'}`
    //   );
    //   if (response?.data?.success === true) {
    //     setActivities(response?.data.data?.Activities);
    //   }
    // } catch (error) {}
  };

  //No need to for this function because we removd page size
  const handlePageSizeChange = async newSize => {
    //setPerPage(newSize);
    // try {
    //   const response = await axios.get(
    //     `/martian/martianActivity?pageNumber=${page}&limit=${newSize}&id=${'63a464bcf290584bd478452a'}`
    //   );
    //   if (response?.data?.success === true) {
    //     setActivities(response?.data?.data?.Activities);
    //   }
    // } catch (error) {}
  };
  const metaTags = {
    title: 'BNBChainDev - Profile',
    description:
      'Stay up-to-date with the BNBChain ecosystem. BNBChain Projects and Developers in one place.',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/mvp/content`,
    shouldIndex: true
  };

  return (
    <Container metaTags={metaTags}>
      {/* Table 1 */}

      <div className="relative z-0 mt-2  flex w-11/12 flex-col divide-gray-200 rounded-md bg-white p-2 text-sm text-gray-500 shadow dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-500">
        <p className="p-4 text-lg font-medium text-gray-500 dark:text-gray-500">Active Content:</p>
        {data.statusactive.length > 0 ? (
          <div className="scrollbar-hide relative mb-2  max-h-96 overflow-y-auto shadow-md  sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Activity
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Type
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Primary Contribution Area
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Additional Contribution Areas
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.statusactive.map((data, index) => (
                  <tr
                    key={index}
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-1 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {data.PublishedAt}
                    </th>
                    <td className="px-4 py-4">
                      <a
                        // href={data.activityLink}
                        rel="noreferrer"
                        target="_blank"
                        className=" hover:underline "
                      >
                        {data.Title}
                      </a>
                    </td>
                    <td className="px-4 py-4">{data.ContentStatus}</td>
                    <td className="px-4 py-4">{data.Author}</td>

                    <td className="px-4 py-4">{data.CreatedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        <Pagination
          showPerPage={false}
          pageCount={10}
          pageSize={perPage}
          onPageChange={page => handlePageChange(page, 'Active')}
          onPageSizeChange={page => handlePageSizeChange(page, 'Active')}
        />
      </div>

      {/* Table 3 */}

      <div className="relative z-0 mt-8  flex w-11/12 flex-col divide-gray-200 rounded-md bg-white p-2 text-sm text-gray-500 shadow dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-500">
        <p className="p-4 text-lg font-medium text-gray-500 dark:text-gray-500">
          Rejected Content:
        </p>
        {data.statusinactive.length > 0 ? (
          <div className="scrollbar-hide relative mb-2  max-h-96 overflow-y-auto shadow-md  sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Activity
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Type
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Primary Contribution Area
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Additional Contribution Areas
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.statusinactive.map((data, index) => (
                  <tr
                    key={index}
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-1 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {data.PublishedAt}
                    </th>
                    <td className="px-4 py-4">
                      <a
                        // href={data.activityLink}
                        rel="noreferrer"
                        target="_blank"
                        className=" hover:underline "
                      >
                        {data.Title}
                      </a>
                    </td>
                    <td className="px-4 py-4">{data.ContentStatus}</td>
                    <td className="px-4 py-4">{data.Author}</td>

                    <td className="px-4 py-4">{data.CreatedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        <Pagination
          showPerPage={false}
          pageCount={10}
          pageSize={perPage}
          onPageChange={page => handlePageChange(page, 'Rejected')}
          onPageSizeChange={page => handlePageSizeChange(page, 'Rejected')}
        />
      </div>
    </Container>
  );
}
