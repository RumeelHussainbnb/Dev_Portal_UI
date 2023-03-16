import { DocumentTextIcon } from '@heroicons/react/solid';
import { Grid, Spacer } from '@nextui-org/react';
import { useState, useId } from 'react';
import Select from 'react-select';
import { Country } from 'country-state-city';
import { useRouter } from 'next/router';
import Pagination from '../../../../components/pagination/Pagination';
import { Container } from '../../../../components/layout';
import { http } from '../../../../utils/http';
import { useAppState } from '../../../../context/AppContext';
import Link from 'next/link';
import Image from 'next/image';

const Index = ({ userData }) => {
  const appState = useAppState();

  const router = useRouter();
  const [data, setData] = useState({
    keyword: '',
    country: { label: '', name: '' },
    awardCategory: { label: '', name: '' }
  });
  //Math.ceil(totalCount / pageSize)
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const awardCategory = [
    {
      label: 'Community Martian',
      value: 'Community Martian'
    },

    {
      label: 'Tech Martian',
      value: 'Tech Martian'
    },

    {
      label: 'Student Ambassador',
      value: 'Student Ambassador'
    }
  ];

  const countries = Country.getAllCountries();

  const updatedCountries = countries.map(country => ({
    label: country.name,
    value: country.name
  }));

  const pagginationHandler = (page, perPage) => {
    const currentPath = router.pathname;
    const currentQuery = { ...router.query }; //Copy current query to avoid its removing
    currentQuery.page = page;
    currentQuery.perPage = perPage;
    router.push({
      pathname: currentPath,
      query: currentQuery
    });
  };

  const handlePageSizeChange = newSize => {
    setPerPage(newSize);
    pagginationHandler(page, newSize);
  };

  const handlePageChange = selectedPage => {
    setPage(selectedPage.selected + 1);
    pagginationHandler(selectedPage.selected + 1, perPage);
  };

  const handleDataSearch = e => {
    e.preventDefault();
    //console.log('data ==> ', data);
    const currentPath = router.pathname;
    const currentQuery = { ...router.query }; //Copy current query to avoid its removing
    currentQuery.page = page;
    currentQuery.perPage = perPage;

    data.keyword !== '' ? (currentQuery.keyword = data.keyword) : delete currentQuery['keyword'];
    data.country.value !== ''
      ? (currentQuery.country = data.country.value)
      : delete currentQuery['country'];
    data.awardCategory.name !== ''
      ? (currentQuery.martian = data.awardCategory.value)
      : delete currentQuery['martian'];

    router.push({
      pathname: currentPath,
      query: currentQuery
    });
  };

  const updateMartian = (eachMartian, event) => {
    event.preventDefault();
    router.push(
      {
        pathname: '/library/admin/martian/update',
        query: eachMartian
      },
      '/library/admin/martian/update'
    );
    // query:eachMartian,
  };

  const handleDataReset = e => {
    e.preventDefault();

    const currentPath = router.pathname;
    let currentQuery = { ...router.query }; //Copy current query to avoid its removing
    currentQuery = {};
    router.push({
      pathname: currentPath,
      query: currentQuery
    });
    setData({
      keyword: '',
      country: { label: '', name: '' },
      awardCategory: { label: '', name: '' }
    });
  };

  const showUserName = martian => {
    if (martian?.FirstName || martian?.LastName) {
      return martian?.FirstName + ' ' + martian?.LastName;
    } else {
      return martian?.Username;
    }
  };
  return (
    <div className="px-4 search-martian-wrapper">
      <main className="max-w-7 xl mx-auto mb-5 shadow">
        <div className="relative overflow-hidden bg-white py-16 px-4 dark:bg-gray-800 sm:px-6 lg:px-8 lg:py-14">
          <div className="">
            <div className="prose prose mx-auto max-w-max text-center prose-h1:mb-2 prose-p:text-lg dark:prose-invert">
              <h1>Search Martians</h1>
            </div>

            <div className="mt-12">
              <form
                action="#"
                method="POST"
                className="grid grid-cols-6 gap-y-8 gap-x-3"
                // onSubmit={createMvp}
              >
                <div className="col-span-12 sm:col-span-4 lg:col-span-2">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      value={data.firstName}
                      autoComplete="given-name"
                      onChange={e => setData({ ...data, keyword: e.target.value })}
                      className="block w-full rounded-md border-gray-300 py-3 px-5 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                    />
                  </div>
                </div>

                <div className="lg:col-span- col-span-12 sm:col-span-2">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Country
                  </label>
                  <div className="mt-1">
                    <Select
                      placeholder="Select a country"
                      instanceId={useId()}
                      name="country"
                      label="country"
                      classNames={{
                        control: state =>
                          'block w-full rounded-md border-gray-300 py-1.5 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800',
                        option: state =>
                          'block w-full border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500  dark:text-gray-800'
                      }}
                      options={updatedCountries}
                      value={data.country.label ? data.country : ''}
                      onChange={countryObject => {
                        setData({
                          ...data,
                          country: countryObject
                        });
                        // updatedStates(countryObject);
                      }}
                    />
                  </div>
                </div>

                <div className="col-span-12 sm:col-span-4 lg:col-span-2">
                  <label
                    htmlFor="awardCategory"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Martian Category
                  </label>
                  <div className="mt-1">
                    <Select
                      placeholder="Select a Martian Category"
                      instanceId={useId()}
                      name="awardCategory"
                      label="awardCategory"
                      classNames={{
                        control: state =>
                          'block w-full rounded-md border-gray-300 py-1.5 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800',
                        option: state =>
                          'block w-full rounded-md border-gray-300 py-1.5 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500  dark:text-gray-800'
                      }}
                      options={awardCategory}
                      value={data.awardCategory.label ? data.awardCategory : ''}
                      onChange={awardCategoryObject => {
                        setData({
                          ...data,
                          awardCategory: awardCategoryObject
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="mx-auto mb-4 flex max-w-3xl justify-between">
                  <button
                    onClick={handleDataReset}
                    className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-yellow-600 py-3 px-16 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:text-gray-200"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleDataSearch}
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-yellow-600 py-3 px-16 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:text-gray-200"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            <Grid.Container gap={2} justify="center">
              {userData?.data?.map((eachMartian, index) => (
                <Grid
                  className="pl-100 search-martian-card"
                  key={index}
                  css={{ justifyItems: 'center', maxwidth: '500' }}
                >
                  <Link href={`/library/admin/martian/${eachMartian._id}`} passHref key={index}>
                    <a>
                      <div className="martian-card h-70 flex w-48 max-w-xs flex-col rounded-xl p-2 shadow-md dark:bg-gray-900 dark:text-gray-100 sm:px-3">
                        {eachMartian?.ProfilePicture ? (
                          <div className=" mx-auto h-24 w-24 overflow-hidden rounded-full">
                            <Image
                              src={eachMartian?.ProfilePicture}
                              alt=""
                              height={'96px'}
                              width={'96px'}
                            />
                          </div>
                        ) : (
                          <div className=" mx-auto h-24 w-24 overflow-hidden rounded-full">
                            <Image src="/martianImage.png" alt="" height={'96px'} width={'96px'} />
                          </div>
                        )}

                        <div className=" space-y-2 divide-y divide-gray-600 text-center">
                          <div className="my-2 space-y-1">
                            <h3 className="sm:text-1xl truncate text-lg font-semibold hover:text-clip">
                              {showUserName(eachMartian)}
                            </h3>
                          </div>
                          <div className=" space-x-4 pt-2">
                            <h5 className="sm:text-1xl px-2 text-sm font-semibold">
                              Martian Category
                            </h5>
                            <p className="px-1 text-sm dark:text-gray-400 ">
                              {eachMartian.MartianType}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-4  text-center">
                          <div className=" space-x-1 pt-2">
                            <h4 className="sm:text-1.5xl text-sm font-semibold">Country</h4>
                            <p className="px-5 text-sm dark:text-gray-400 sm:text-base">
                              {eachMartian.Country}
                            </p>
                          </div>
                        </div>
                        {appState.editMode == 'true' ? (
                          <button
                            className="mt-1 inline-flex items-center justify-center space-x-2 text-yellow-600 hover:text-yellow-400 dark:text-yellow-500 dark:hover:text-yellow-400"
                            onClick={event => updateMartian(eachMartian, event)}
                          >
                            <DocumentTextIcon className="h-5 w-5" aria-hidden="true" />
                            <span className="font-medium">Edit Data</span>
                          </button>
                        ) : null}
                      </div>
                    </a>
                  </Link>
                  <Spacer y={0.5} x={1} />
                </Grid>
              ))}
              {userData?.data?.length <= 0 && (
                <div className="prose dark:prose-invert sm:ml-6">
                  <div className="sm:pl-6 dark:sm:border-gray-500">
                    <p>No Data Found</p>
                  </div>
                </div>
              )}
            </Grid.Container>

            <Pagination
              pageCount={Math.ceil(userData.totalMartains / perPage)}
              pageSize={perPage}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

//Fetching posts in get Intial Props to make the app seo friendly
Martians.getInitialProps = async ({ query }) => {
  const page = query.page || 1; //if page empty we request the first page
  const perPage = query.perPage || 10;
  const keyword = query.keyword || '';
  const country = query.country || '';
  const martian = query.martian || '';

  const response = await http.get(
    `/user/getMartians?pageNumber=${page}&limit=${perPage}&keyword=${keyword}&country=${country}&martian=${martian}`
  );

  return {
    userData: response?.data?.data
  };
};

export default function Martians({ userData }) {
  const metaTags = {
    title: 'BNB Chain - Library Admin Martians',
    description: 'Library Admin Martians',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/martian/index`,
    shouldIndex: false
  };

  return (
    <Container metaTags={metaTags}>
      <Index userData={userData} />
    </Container>
  );
}
