import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import { Container } from '../../components/layout';
import Image from 'next/image';
import 'react-circular-progressbar/dist/styles.css';
import axios from '../../utils/http';
import EndPoint from '../../constant/endPoints';
import InputField from '../../components/InputField';
import MultiSelection from '../../components/MultiSelection';
import validation from '../../utils/validation';
import Loader from '../../components/Loader';
import { useRouter } from 'next/router';
const Spinner = dynamic(() => import('../../components/spinner'));

export default function Profile() {
  const inputFile = useRef(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [state, setState] = useState();
  const [loader, setloader] = useState(false);
  const metaTags = {
    title: 'BNBChainDev - Update Profile',
    description:
      'Stay up-to-date with the BNBChain ecosystem. BNBChain Projects and Developers in one place.',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/edit-profile`,
    shouldIndex: true
  };
  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');

    let { data } = userData;
    const createData = {
      _id: data._id,
      Username: data.Username,
      Bio: data.Bio,
      Country: data.Country,
      Email: data?.Email,
      ProfilePicture: data.ProfilePicture,
      Facebook: data?.Author?.SocialLinks[0]?.Link,
      Linkedin: data?.Author?.SocialLinks[1]?.Link,
      Twitter: data?.Author?.SocialLinks[2]?.Link,
      Telegram: data?.Author?.SocialLinks[3]?.Link,
      Skils: data?.Skils,
      Certification: data?.Author?.Certification
    };
    setState(createData);
    const fetchData = async () => {
      try {
        // const user = await axios.get(
        //   `/user/getUserProfile/${user.data?._id}`
        // );
        // setActivity(martian?.data?.Activities);
        // console.log('martian ==> ', martian);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const [errors, setErrors] = useState({
    Username: '',
    Email: '',
    Bio: '',
    Country: '',
    Skils: '',
    ProfilePicture: ''
  });
  const onIconClick = () => {
    inputFile.current.click();
  };
  const handleFileUpload = async e => {
    setIsLoading(true);
    //file Validation Extentions
    let allowedExtensions = ['jpg', 'jpeg', 'png'];
    const { files } = e.target;

    if (files && files.length) {
      const filename = files[0].name;
      const firstFile = files[0];
      let parts = filename.split('.');
      const fileType = parts[parts.length - 1];

      //sucess
      if (allowedExtensions.includes(fileType)) {
        const response = await axios.get(`${EndPoint.BASE_URL}/martian/s3Url`);
        const imageResponse = await fetch(response.data.url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          body: firstFile
        });

        const profilePicture = response.data.url.split('?')[0];
        setState({ ...state, ProfilePicture: profilePicture });
      } else {
        //through image type error
      }
    }
    setIsLoading(false);
  };
  const handleChange = (
    propertyName,
    change,
    validate = {
      type: '',
      payload: '',
      required: false,
      index: 0
    }
  ) => {
    // validating
    // others
    if (validate?.type?.length > 0) {
      setErrors({
        ...errors,
        [propertyName]: validation(change.target.value, validate)
      });
    }
    if (propertyName === 'Name' || propertyName === 'Organization') {
      let temp = [...certificateArray];
      temp[validate.index][propertyName] = change.target.value;
      setcertificateArray(temp);
    } else {
      setState({ ...state, [propertyName]: change.target.value.trimStart() });
    }
  };
  // validation
  const validate = () => {
    const errorsChecked = {
      Username: validation(state.Username, { required: true }),
      Email: validation(state.Email, { type: 'email', required: true }),
      Bio: validation(state.Bio, { required: true }),
      Country: validation(state.Country, { required: true }),
      Skils: validation(state.Skils, { required: false })
    };
    setErrors({ ...errors, ...errorsChecked });
    let foundErrors =
      Object.values({ ...errors, ...errorsChecked })?.filter(item => item !== '')?.length > 0
        ? true
        : false;
    // will return true if no errors
    return !foundErrors;
  };
  const _updateProfile = item => {
    let mergedArray = [...item?.Certification, ...certificateArray];
    setloader(true);
    let payload = {
      Username: item.Username,
      Bio: item.Bio,
      Country: item.Country,
      Skils: item.Skils.map(skills => skills),
      Email: item.Email,
      ProfilePicture: item.ProfilePicture,
      Author: {
        SocialLinks: [
          {
            Link: item.Facebook,
            Name: 'Facebook'
          },
          {
            Link: item.Linkedin,
            Name: 'Linkedin'
          },
          {
            Link: item.Twitter,
            Name: 'Twitter'
          },
          {
            Link: item.Telegram,
            Name: 'Telegram'
          }
        ],
        Certification: mergedArray.filter(x => x.Organization != '' && x.Name != '')
      }
    };
    var formDataa = new FormData();
    axios
      .put(`/user/updateUserProfile/${state._id}`, payload)
      .then(response => {
        setloader(false);
        console.log(response);
        router.push('/user/profile');
      })
      .catch(error => {
        setloader(false);
        console.log(error);
      });
  };
  //create location
  const [certificateArray, setcertificateArray] = useState([
    {
      _id: '1',
      Name: '',
      Organization: ''
    }
  ]);
  //add certificate
  const Addcertificate = () => {
    const tempArr = [...certificateArray];
    let lastElement = tempArr.slice(-1);
    console.log('Last Object--------->', lastElement[0]._id);
    let index = lastElement[0]._id + 1;
    console.log('Index--------->', index);
    tempArr.push({
      _id: index.toString(),
      Name: '',
      Organization: ''
    });
    // // update state
    setcertificateArray(tempArr);
    console.log('Add certificate--------->', tempArr);
  };
  return (
    <Container metaTags={metaTags}>
      <Loader loader={loader} />
      <div className="flex w-full gap-3 md:pl-0">
        <main className="">
          <div className="px-1 sm:px-6">
            <div className="relative flex flex-col divide-gray-200 rounded-md bg-white p-2 px-6 py-8 shadow dark:divide-gray-700">
              <p className="text-lg font-bold">Personal Information:</p>
              <div className="mx-auto mt-10 h-24 w-28 text-center" onClick={onIconClick}>
                <input
                  style={{ display: 'none' }}
                  ref={inputFile}
                  onChange={handleFileUpload}
                  type="file"
                />
                <div className="relative w-28">
                  <div className="col-span-12 sm:col-span-4 lg:col-span-10">
                    {isLoading ? (
                      <Spinner />
                    ) : state?.ProfilePicture ? (
                      <div className="absolute h-28 w-28 rounded-full">
                        <Image
                          src={state.ProfilePicture}
                          alt=""
                          height={'112px '}
                          width={'112px '}
                        />
                      </div>
                    ) : (
                      <div className="absolute h-28 w-28 rounded-full">
                        <Image
                          src="/profilepicture.png"
                          alt=""
                          height={'112px '}
                          width={'112px '}
                        />
                      </div>
                    )}
                    {!isLoading && (
                      <div className="group absolute flex h-28 w-28 cursor-pointer items-center justify-center rounded-full opacity-60 transition duration-500 hover:bg-gray-200">
                        <div className="hidden w-5 group-hover:block">
                          <Image src="/upload.svg" alt="" height={'112px '} width={'112px '} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <p className="mt-6 flex self-center text-lg font-bold text-black">
                Welcome, {state?.Username}
              </p>
              <div className="mt-2 flex flex-wrap">
                <InputField
                  type="text"
                  onChange={e =>
                    handleChange('Username', e, {
                      type: 'required',
                      required: true
                    })
                  }
                  value={state?.Username}
                  label={'Username'}
                  placeholder="Username"
                  error={errors.Username}
                />
                <InputField
                  type="text"
                  onChange={e =>
                    handleChange('Email', e, {
                      type: 'email',
                      required: true
                    })
                  }
                  value={state?.Email}
                  label={'Email'}
                  placeholder="Email"
                  error={errors.Email}
                />
                <InputField
                  onChange={e =>
                    handleChange('Country', e, {
                      type: 'required',
                      required: true
                    })
                  }
                  value={state?.Country}
                  type="text"
                  label={'Country'}
                  placeholder="Enter Country"
                  error={errors.Country}
                />
              </div>
              <div className="flex flex-wrap">
                <div className="lg:w-12/12 w-full px-4">
                  <div className="relative mb-3 w-full">
                    <label
                      className="mb-2 block text-xs font-bold uppercase text-slate-600"
                      htmlFor="grid-password"
                    >
                      Bio
                    </label>
                    <textarea
                      type="text"
                      onChange={e => {
                        handleChange('Bio', e, {
                          type: 'max',
                          payload: 500
                        });
                      }}
                      value={state?.Bio}
                      className="w-full rounded border-[1px] border-slate-300 bg-white px-3 py-3 text-sm text-slate-600 placeholder-slate-300 transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      rows="4"
                      placeholder="Enter Bio"
                    ></textarea>
                    {errors?.Bio && <p className="text-red-500">{errors.Bio}</p>}
                  </div>
                </div>
              </div>
              <div className="w-ful">
                <MultiSelection
                  title="Skills"
                  value={state?.Skils}
                  onRemove={item => {
                    if (state.Skils?.filter(element => item !== element).length == 0) {
                      setErrors({ ...errors });
                    }
                    setState({
                      ...state,
                      Skils: state.Skils?.filter(element => item !== element)
                    });
                  }}
                  onAdd={item => {
                    setErrors({ ...errors, Skils: '' });
                    setState({
                      ...state,
                      Skils: [...state?.Skils, item]
                    });
                  }}
                  options={['Node.JS', 'BlockChain', 'Java', 'JavaScript', 'Python', '.NET']}
                  error={errors.Skils}
                />
              </div>
            </div>

            <div className="relative mt-2 flex flex-col divide-gray-200  rounded-md bg-white p-2 px-8 py-8 shadow dark:divide-gray-700">
              <p className="text-lg font-bold">Social Information:</p>
              <div className="mt-2 flex flex-wrap">
                <InputField
                  type="text"
                  value={state?.Facebook}
                  label={'Facebook'}
                  placeholder="Enter Facebook Link (optional)"
                  onChange={e => handleChange('Facebook', e)}
                />
                <InputField
                  type="text"
                  value={state?.Twitter}
                  label={'Twitter'}
                  placeholder="Enter Twitter Link (optional)"
                  onChange={e => handleChange('Twitter', e)}
                />
                <InputField
                  value={state?.Linkedin}
                  type="text"
                  label={'Linkedin'}
                  placeholder="Enter Linkedin Link (optional)"
                  onChange={e => handleChange('Linkedin', e)}
                />
                <InputField
                  value={state?.Telegram}
                  type="text"
                  label={'Telegram'}
                  placeholder="Enter Telegram Link"
                  onChange={e => handleChange('Telegram', e)}
                />
              </div>
            </div>

            <div className="mt-3 flex flex-row items-center justify-center self-center">
              <div
                onClick={() => {
                  if (validate()) {
                    _updateProfile(state);
                  }
                }}
                className={`mt-2 ml-4 cursor-pointer rounded bg-[#FACC15] p-2 px-4 font-bold text-white`}
              >
                Save
              </div>
              <div
                onClick={() => {
                  router.push('/user/profile');
                }}
                className={`mt-2 ml-4 cursor-pointer rounded bg-[#FACC15] p-2 px-4 font-bold text-white`}
              >
                Cancel
              </div>
            </div>
          </div>
        </main>
        <aside className="w-fit">
          <div className="relative z-0 mt-2 flex flex-col divide-gray-200 rounded-md  bg-white p-2 px-8 py-8 shadow dark:divide-gray-700">
            <p className="mb-3 text-lg font-medium uppercase">Certification: </p>
            {certificateArray.map((item, index) => (
              <div key={index} className="mt-2 flex flex-wrap">
                <InputField
                  type="text"
                  onChange={e =>
                    handleChange('Name', e, {
                      index: index
                    })
                  }
                  value={certificateArray?.Name}
                  label={'Certification Title'}
                  placeholder="Title"
                />
                <InputField
                  type="text"
                  onChange={e =>
                    handleChange('Organization', e, {
                      index: index
                    })
                  }
                  value={certificateArray?.Organization}
                  label={'Organization'}
                  placeholder="Enter Organization"
                />
              </div>
            ))}

            <div
              onClick={Addcertificate}
              className={`mt-2 ml-4 mb-3 flex w-32 cursor-pointer items-center justify-center self-center rounded bg-[#FACC15] p-2 px-4 font-bold text-white`}
            >
              Add More
            </div>

            <div
              className={
                'relative mb-3 flex w-full min-w-0 flex-col break-words bg-white text-white'
              }
            >
              <div className="block w-full overflow-x-auto">
                {/* Projects table */}
                {state?.Author?.Certification.length > 0 ? (
                  <table className="w-full border-collapse items-center bg-transparent">
                    <thead>
                      <tr>
                        {['', 'Organization', 'Name'].map((item, index) => (
                          <th
                            key={index}
                            className={
                              'whitespace-nowrap border border-l-0 border-r-0 border-solid border-slate-100 bg-[#FACC15] px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-slate-700'
                            }
                          >
                            {item}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    {state?.Author?.Certification.map(item => (
                      <tbody key={item._id}>
                        <tr>
                          <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-xs text-black">
                            <Image src={'/certificate.png'} width={'30px'} height={'30px'} alt="" />
                          </td>

                          <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-xs text-black">
                            {item.Organization}
                          </td>
                          <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-xs text-black">
                            {item.Name}
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                ) : (
                  <div className="flex hidden h-full w-64 items-center py-4 px-8">
                    <p className="text-sm font-bold text-black">No Record Available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
