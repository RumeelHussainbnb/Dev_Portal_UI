import { format } from 'date-fns';
import { useRouter } from 'next/router';
import Select from 'react-select';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { useState, useId, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import { http } from '../../../../utils/http';
import fetch from '../../../../utils/fetcher';
import { Container } from '../../../../components/layout';
import DeleteModal from '../../../../components/deleteModal/index';

const ActivityForm = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState({
    id: null,
    date: selectedDate,
    activityLink: '',
    activity: '',
    type: { label: '', name: '' },
    primaryContributionArea: { label: '', name: '' },
    additionalContributionArea: { label: '', name: '' }
  });
  const [activity, setActivity] = useState(null);
  const [mode, setMode] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [model, setModel] = useState(false);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const fetchData = async () => {
      try {
        const martian = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/activity/?pageNumber=1&limit=100&id=${userData?.data?._id}`
        );
        setActivity(martian?.data?.totalActivity);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const type = [
    {
      label: 'Blog/Website Post',
      value: 'Blog/Website Post'
    },

    {
      label: 'Speaking (Conference)',
      value: 'Speaking (Conference)'
    },

    {
      label: 'Mentorship',
      value: 'Mentorship'
    },
    {
      label: 'Article',
      value: 'Article'
    },
    {
      label: 'Book (Author)',
      value: 'Book (Author)'
    },
    {
      label: 'Speaking (User Group/Meetup/Local events)',
      value: 'Speaking (User Group/Meetup/Local events)'
    },
    {
      label: 'Organizer (User Group/Meetup/Local Events)',
      value: 'Organizer (User Group/Meetup/Local Events)'
    }
  ];

  const primaryContributionArea = [
    {
      label: 'Azure Machine Learning',
      value: 'Azure Machine Learning'
    },

    {
      label: 'Python',
      value: 'Python'
    },

    {
      label: '.NET',
      value: '.NET'
    }
  ];

  const additionalContributionArea = [
    {
      label: 'Azure Cognitive Services',
      value: 'Azure Cognitive Services'
    },

    {
      label: 'Azure Bot Service',
      value: 'Azure Bot Service'
    },
    {
      label: 'Azure Cognitive Search',
      value: 'Azure Cognitive Search'
    },
    {
      label: 'Azure Machine Learning',
      value: 'Azure Machine Learning'
    }
  ];

  const createActivity = async event => {
    event.preventDefault();
    const formattedDate = selectedDate ? format(selectedDate, 'dd/MM/yyyy') : '';
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');

    //create Mode
    if (mode == false) {
      //Same Name Validation
      let sameNameActivity = activity.find(f => f.activity === data.activity);
      if (sameNameActivity) {
        toast.error('Activity with dupliate name found!');

        return;
      }
      let newActivity = {
        date: formattedDate,
        userId: userData?.data?._id,
        activity: data.activity,
        activityLink: data.activityLink,
        type: data.type.label,
        primaryContributionArea: data.primaryContributionArea.label,
        additionalContributionArea: data.additionalContributionArea.label
      };

      try {
        const addActivity = await http.post(`activity`, newActivity);
        if (addActivity?.data?.success === true) {
          let copiedActivity = [...activity];
          copiedActivity.push(addActivity?.data?.data);
          setActivity(copiedActivity);
          //Empty editor state
          setSelectedDate(new Date());
          setData({
            id: null,
            date: '',
            activity: '',
            activityLink: '',
            type: { label: '', name: '' },
            primaryContributionArea: { label: '', name: '' },
            additionalContributionArea: { label: '', name: '' }
          });
          toast.success('Successfully posted!, Thank you');
        }
      } catch (error) {
        //Empty editor state
        setSelectedDate(new Date());
        setData({
          id: null,
          date: '',
          activity: '',
          activityLink: '',
          type: { label: '', name: '' },
          primaryContributionArea: { label: '', name: '' },
          additionalContributionArea: { label: '', name: '' }
        });
        toast.error('Something went wrong!');
      }
    }
    //edit Mode
    else {
      let updateActivity = {
        id: data.id,
        userId: userData?.data?._id,
        martianId: userData?.data?.MartianId,
        date: formattedDate,
        activity: data.activity,
        activityLink: data.activityLink,
        type: data.type.label,
        primaryContributionArea: data.primaryContributionArea.label,
        additionalContributionArea: data.additionalContributionArea.label
      };

      try {
        const editActivity = await http.put('activity', updateActivity);
        if (editActivity?.data?.success === true) {
          let copiedActivity = [...activity];
          let index = copiedActivity.findIndex(d => d._id === updateActivity.id);
          // Ugly hack, otherwise not working
          console.log('0');
          console.log('0');
          copiedActivity[index] = editActivity?.data?.data;
          console.log('0');
          setActivity(copiedActivity);
          setMode(false);
          //Empty editor state
          setSelectedDate(new Date());
          setData({
            index: null,
            date: '',
            activityLink: '',
            activity: '',
            type: { label: '', name: '' },
            primaryContributionArea: { label: '', name: '' },
            additionalContributionArea: { label: '', name: '' }
          });
          toast.success('Successfully updated!');
        }
      } catch (error) {
        //Empty editor state
        console.log('Error');
        setSelectedDate(new Date());
        setData({
          index: null,
          date: '',
          activity: '',
          activityLink: '',
          type: { label: '', name: '' },
          primaryContributionArea: { label: '', name: '' },
          additionalContributionArea: { label: '', name: '' }
        });
        setMode(false);
        toast.error('Something went wrong!');
      }
    }
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const hadnleDeleteConfirmationModal = id => {
    setDeleteId(id);
    setModel(true);
  };

  const handleDeleteActivity = async () => {
    event.preventDefault();
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');

    try {
      const deleteActivity = await http.delete(`activity?_id=${deleteId}`);
      if (deleteActivity?.data?.success === true) {
        let copyActivityState = [...activity];

        setActivity(copyActivityState.filter(d => d._id !== deleteId));
        toast.success('Successfully deleted!');
      }
    } catch (error) {
      //Empty editor state
      toast.error('Something went wrong!');
    }
  };

  const handleEditActivity = (data, event) => {
    event.preventDefault();

    setSelectedDate(new Date());
    setData({
      id: data._id,
      activity: data.activity,
      activityLink: data.activityLink,
      type: { label: data.type, name: data.type },
      primaryContributionArea: {
        label: data.primaryContributionArea,
        name: data.primaryContributionArea
      },
      additionalContributionArea: {
        label: data.additionalContributionArea,
        name: data.additionalContributionArea
      }
    });
    setMode(true);
  };

  const handleCancel = e => {
    e.preventDefault();

    setMode(false);
    setData({
      id: null,
      date: selectedDate,
      activityLink: '',
      activity: '',
      type: { label: '', name: '' },
      primaryContributionArea: { label: '', name: '' },
      additionalContributionArea: { label: '', name: '' }
    });
  };
  return (
    <div className="add-martian-wrapper">
      <main className="mx-auto  mb-5  shadow">
        {model && (
          <DeleteModal
            handleConfirmation={handleDeleteActivity}
            setShowModal={setModel}
            showModel={model}
            nameOfTheDeleted="Activity"
          />
        )}
        <div className="relative overflow-hidden bg-white py-16 px-2 dark:bg-gray-800 sm:px-6 lg:px-8 lg:py-14">
          <div className=" mx-auto ">
            <div className="prose prose mx-auto max-w-max text-center prose-h1:mb-2 prose-p:text-lg dark:prose-invert">
              <h1>MARTIAN ACTIVITY</h1>
            </div>

            <div className="mt-12 ">
              <form
                action="#"
                method="POST"
                className="grid grid-cols-8 gap-y-8 gap-x-20"
                onSubmit={createActivity}
              >
                <div className="xs:col-span-7 col-span-12  sm:col-span-4 lg:col-span-4">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Date
                  </label>
                  <div className="mt-1">
                    <DatePicker
                      calendarClassName="dark:bg-gray-400"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                      //wrapperClassName="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                      dateFormat="dd/MM/yyyy"
                      selected={selectedDate}
                      onChange={handleDateChange}
                    />
                  </div>
                </div>

                <div className="col-span-12 sm:col-span-4 lg:col-span-4">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Activity
                  </label>
                  <div className="mt-1">
                    <input
                      disabled={mode}
                      type="text"
                      name="activity"
                      id="actvivity"
                      required
                      value={data.activity}
                      autoComplete="activity"
                      onChange={e => setData({ ...data, activity: e.target.value })}
                      className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                    />
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-4 lg:col-span-8">
                  <label
                    htmlFor="expertise"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Activity Link
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="activityLink"
                      id="activityLink"
                      required
                      value={data.activityLink}
                      autoComplete="activity"
                      onChange={e => setData({ ...data, activityLink: e.target.value })}
                      className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                    />
                  </div>
                </div>
                <div className="xs:col-span-7  col-span-12  sm:col-span-4 lg:col-span-4">
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Type
                  </label>
                  <div className="mt-1">
                    <Select
                      placeholder="Select a Type"
                      instanceId={useId()}
                      name="type"
                      label="type"
                      required
                      classNames={{
                        control: state =>
                          'py-1.5 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 focus:border-yellow-500 focus:ring-yellow-500',
                        option: state =>
                          'dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 focus:border-yellow-500 focus:ring-yellow-500'
                      }}
                      options={type}
                      value={data.type.label ? data.type : ''}
                      onChange={typeObject => {
                        setData({
                          ...data,
                          type: typeObject
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="xs:col-span-7  col-span-12  sm:col-span-4 lg:col-span-4">
                  <label
                    htmlFor="martian"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Primary Contribution Area
                  </label>
                  <div className="mt-1">
                    <Select
                      placeholder="Select Primary Contribution Area	"
                      instanceId={useId()}
                      name="primaryContributionArea	"
                      label="primaryContributionArea	"
                      required
                      classNames={{
                        control: state =>
                          'py-1.5 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 focus:border-yellow-500 focus:ring-yellow-500',
                        option: state =>
                          'dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 focus:border-yellow-500 focus:ring-yellow-500'
                      }}
                      options={primaryContributionArea}
                      value={data.primaryContributionArea.label ? data.primaryContributionArea : ''}
                      onChange={primaryContributionObject => {
                        setData({
                          ...data,
                          primaryContributionArea: primaryContributionObject
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="col-span-12 sm:col-span-8 lg:col-span-8">
                  <label
                    htmlFor="martian"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Additional Contribution Areas
                  </label>
                  <div className="mt-1">
                    <Select
                      placeholder="Select Additional Contribution Areas"
                      instanceId={useId()}
                      name="additionalContributionArea"
                      label="additionalContributionArea"
                      required
                      classNames={{
                        control: state =>
                          'py-1.5 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 focus:border-yellow-500 focus:ring-yellow-500',
                        option: state =>
                          'dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 focus:border-yellow-500 focus:ring-yellow-500'
                      }}
                      options={additionalContributionArea}
                      value={
                        data.additionalContributionArea.label ? data.additionalContributionArea : ''
                      }
                      onChange={additionalContributionArea => {
                        setData({
                          ...data,
                          additionalContributionArea: additionalContributionArea
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="mx-auto flex max-w-3xl justify-center">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-yellow-600 py-3 px-16 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:text-gray-200"
                  >
                    {mode == false ? 'Add' : 'Edit'}
                  </button>
                </div>

                <div className="mx-auto flex max-w-3xl justify-center">
                  <button
                    type="button"
                    onClick={e => {
                      if (mode != false) {
                        handleCancel(e);
                      } else {
                        router.back();
                      }
                    }}
                    className="inline-flex justify-center rounded-md border border-transparent bg-yellow-600 py-3 px-16 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:text-gray-200"
                  >
                    {mode != false ? 'Clear' : 'Cancel'}
                  </button>
                </div>
              </form>
            </div>

            {activity?.length > 0 ? (
              <div className="mb-1 w-full py-8">
                <div className="relative max-h-96 overflow-y-auto shadow-md  sm:rounded-lg">
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
                        <th scope="col" className="px-4 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {activity.map((data, index) => (
                        <tr
                          key={index}
                          className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            className="whitespace-nowrap px-1 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            {data.date}
                          </th>

                          <td className="px-4 py-4">
                            <a
                              href={data.activityLink}
                              rel="noreferrer"
                              target="_blank"
                              className=" hover:underline "
                            >
                              {data.activity}
                            </a>
                          </td>

                          <td className="px-4 py-4">{data.type}</td>
                          <td className="px-4 py-4">{data.primaryContributionArea}</td>

                          <td className="px-4 py-4">{data.additionalContributionArea}</td>

                          <td className="px-4 py-4 text-right">
                            <a
                              href="#"
                              onClick={event => handleEditActivity(data, event)}
                              className="font-medium text-yellow-600 hover:underline dark:text-yellow-500"
                            >
                              Edit
                            </a>
                            /
                            <a
                              onClick={() => hadnleDeleteConfirmationModal(data._id)}
                              className="font-medium text-red-600 hover:underline dark:text-red-500"
                            >
                              Delete
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
};

export default function ContentMartians({ martian }) {
  const metaTags = {
    title: 'BNB Chain - Library Admin Martians',
    description: 'Library Admin Martians',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/martian/create`,
    shouldIndex: false
  };

  return (
    <Container metaTags={metaTags}>
      <ActivityForm martian={martian} />
    </Container>
  );
}
