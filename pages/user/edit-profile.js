import Image from 'next/image';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { Country } from 'country-state-city';
import 'react-circular-progressbar/dist/styles.css';
import { TrashIcon, XIcon } from '@heroicons/react/solid';
import { useEffect, useState, useRef, useId } from 'react';

//*Local Imports
import { http } from '../../utils/http';
import validation from '../../utils/validation';
import { Container } from '../../components/layout';
import Loader from '../../components/Loader/Loader';
import InputField from '../../components/InputField';
import DeleteModal from '../../components/deleteModal/index';

export default function Profile() {
  const [deleteModel, setDeleteModel] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const inputFile = useRef(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({});
  const [certificateArray, setcertificateArray] = useState([
    {
      _id: '1',
      Name: '',
      Organization: ''
    }
  ]);

  const SkillsOptions = [
    {
      label: 'Node.JS',
      value: 'Node.JS'
    },
    {
      label: 'BlockChain',
      value: 'BlockChain'
    },
    {
      label: 'Java',
      value: 'Java'
    },
    {
      label: 'JavaScript',
      value: 'JavaScript'
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

  const metaTags = {
    title: 'BNBChainDev - Update Profile',
    description:
      'Stay up-to-date with the BNBChain ecosystem. BNBChain Projects and Developers in one place.',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/edit-profile`,
    shouldIndex: true
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const user = await http.get(`/user/getUserProfile/${userData.data?._id}`);
        let { data } = user?.data;
        const createData = {
          ...data,
          _id: data._id,
          Username: data.Username,
          FirstName: data.FirstName,
          LastName: data.LastName,
          Bio: data.Bio,
          Country: { label: data.Country, name: data.Country },
          Email: data?.Email,
          ProfilePicture: data.ProfilePicture,
          Facebook: data?.Author?.SocialLinks[0]?.Link,
          Linkedin: data?.Author?.SocialLinks[1]?.Link,
          Twitter: data?.Author?.SocialLinks[2]?.Link,
          Telegram: data?.Author?.SocialLinks[3]?.Link,
          Skills: data?.Skills?.map(d => {
            return { label: d, value: d };
          }),
          Certification:
            data?.Author?.Certification?.length === 0
              ? certificateArray
              : data?.Author?.Certification
        };
        setState(createData);
        setcertificateArray(createData?.Certification);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const [errors, setErrors] = useState({
    Username: '',
    Email: '',
    Bio: '',
    Country: '',
    Skills: '',
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
        const response = await http.get(`/martian/s3Url`);
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
        toast.info('Invalid Image Type. [Supported jpg, jpeg, png]');
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
      Bio: validation(state.Bio, { required: false }),
      Country: validation(state.Country, { required: true }),
      Skills: validation(state.Skills, { required: false })
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
    let mergedArray = [...certificateArray];

    let payload = {
      ...item,
      Username: item.Username,
      Bio: item.Bio,
      FirstName: item.FirstName,
      LastName: item.LastName,
      Country: item.Country,
      Skills: item.Skills?.map(skills => skills?.label),
      Email: item.Email,
      Country: item.Country.label,
      ProfilePicture: item.ProfilePicture,
      Author: {
        ...item?.Author,
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
    http
      .put(`/user/updateUserProfile/${state._id}`, payload)
      .then(response => {
        router.push(`/user/profile/${state._id}`);
      })
      .catch(error => {});
  };
  //create location
  //add certificate
  const Addcertificate = index => {
    const tempArr = [...certificateArray];
    if (tempArr[index].Name != '' && tempArr[index].Organization != '') {
      let lastElement = tempArr.slice(-1);

      let index = lastElement[0]._id + 1;

      tempArr.push({
        _id: index.toString(),
        Name: '',
        Organization: ''
      });
      // // update state
      setcertificateArray(tempArr);
    } else {
      toast.warning('Please fill out certification fields');
    }
  };

  const handleDeleteModel = index => {
    setDeleteIndex(index);
    setDeleteModel(true);
  };
  const DeleteCertifcate = () => {
    const tempArr = [...certificateArray];
    tempArr.splice(deleteIndex, 1);
    setcertificateArray(tempArr);
  };

  const ClearCertifcate = index => {
    const tempArr = [...certificateArray];
    tempArr[index].Name = '';
    tempArr[index].Organization = '';
    setcertificateArray(tempArr);
  };

  const countries = Country.getAllCountries();

  const updatedCountries = countries.map(country => ({
    label: country.name,
    value: country.name
  }));

  //* styling of multiSelect
  const colourStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: state.isFocused ? 'grey' : 'red'
    }),
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: '#FACC15'
      };
    },

    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: '#FF0000',
      ':hover': {
        backgroundColor: '#FF0000',
        color: 'white'
      }
    })
  };

  return (
    <Container className="page-overlay" metaTags={metaTags}>
      {isLoading && <Loader />}
      {deleteModel && (
        <DeleteModal
          handleConfirmation={DeleteCertifcate}
          setShowModal={setDeleteModel}
          showModel={deleteModel}
          nameOfTheDeleted="Certificate"
        />
      )}
      <div className="edit-profile-page flex w-full justify-around gap-3 md:pl-0">
        <main className="w-full">
          <div className="px-1 sm:px-6">
            <div className="relative flex flex-col divide-gray-200 rounded-md bg-white  p-2 py-8 shadow dark:divide-gray-700 dark:bg-gray-800 sm:px-2 lg:px-6">
              {/* <p className="text-lg font-bold">Personal Information:</p> */}
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
                      <Loader />
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
                    handleChange('FirstName', e, {
                      type: 'required',
                      required: true
                    })
                  }
                  value={state?.FirstName}
                  label={'First Name'}
                  placeholder="First Name"
                  error={errors.FirstName}
                />
                <InputField
                  type="text"
                  onChange={e =>
                    handleChange('LastName', e, {
                      type: 'required',
                      required: true
                    })
                  }
                  value={state?.LastName}
                  label={'Last Name'}
                  placeholder="Last Name"
                  error={errors.LastName}
                />
              </div>
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
                {/* <InputField
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
                /> */}
                <div className="w-full px-4 lg:w-6/12">
                  <div className="relative mb-3 w-full">
                    <label
                      className="mb-2 flex text-xs font-bold uppercase text-slate-600 text-slate-600 dark:text-gray-300 dark:text-gray-300"
                      htmlFor="grid-password"
                    >
                      Country
                    </label>
                    <Select
                      placeholder="Select a country"
                      instanceId={useId()}
                      required
                      name="country"
                      label="country"
                      // className={`${
                      //   error?.length > 0 ? 'border-[1px] border-red-500' : ''
                      // } w-full rounded border-[1px] border-slate-300 bg-white px-3 py-3 text-sm text-slate-600 placeholder-slate-300 transition-all duration-150 ease-linear focus:outline-none focus:ring`}
                      classNames={{
                        control: state =>
                          'py-1.5 dark:border-slate-300 dark:bg-white-400 dark:text-gray-800 focus:border-yellow-500 focus:ring-yellow-500',

                        option: state =>
                          state.isSelected
                            ? ' dark:bg-white-400 bg-white dark:text-gray-800 '
                            : 'bg-white'
                      }}
                      options={updatedCountries}
                      value={state.Country?.label ? state.Country : ''}
                      onChange={countryObject => {
                        setState({
                          ...state,
                          Country: countryObject
                        });
                      }}
                    />

                    {errors.Country?.length > 0 && (
                      <div className="mt-1 text-red-500">{errors.Country}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="lg:w-12/12 w-full px-4">
                  <div className="relative mb-3 w-full">
                    <label
                      className="mb-2 block text-xs font-bold uppercase text-slate-600  dark:text-gray-300 dark:text-gray-300"
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
              <div className="skills-wrapper flex flex-wrap">
                <div className="lg:w-12/12 w-full px-4">
                  <div className="relative mb-3 w-full">
                    <label
                      className="mb-2 block text-xs font-bold uppercase text-slate-600  dark:text-gray-300"
                      htmlFor="grid-password"
                    >
                      Skills
                    </label>
                    <Select
                      closeMenuOnSelect={false}
                      classNames={{
                        singleValue: state =>
                          state.isDisabled ? 'dark:text-gray-800 text-gray-800' : '',
                        control: state =>
                          'skills-select-list py-1 rounded border-slate-300 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 focus:border-yellow-500 focus:ring-yellow-500',
                        option: state =>
                          state.isSelected
                            ? ' dark:bg-gray-400 bg-white dark:text-gray-800 '
                            : 'bg-white'
                      }}
                      isMulti
                      value={state.Skills}
                      options={SkillsOptions}
                      placeholder="Select skills"
                      onChange={skillArray => {
                        setState({
                          ...state,
                          Skills: skillArray
                        });
                      }}
                      styles={colourStyles}
                    />
                    {/* <MultiSelection
                  title="Skills"
                  value={state?.Skills}
                  onRemove={item => {
                    if (state.Skills?.filter(element => item !== element).length == 0) {
                      setErrors({ ...errors });
                    }
                    setState({
                      ...state,
                      Skills: state.Skills?.filter(element => item !== element)
                    });
                  }}
                  onAdd={handleAddSkills}
                  options={['Node.JS', 'BlockChain', 'Java', 'JavaScript', 'Python', '.NET']}
                  error={errors.Skills}
                /> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-2 flex flex-col divide-gray-200  rounded-md bg-white p-2 py-8 shadow dark:divide-gray-700 dark:bg-gray-800 sm:px-2 lg:px-6">
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
            <div className="relative z-0 mt-2 flex flex-col divide-gray-200  rounded-md bg-white p-2 py-8 shadow dark:divide-gray-700 dark:bg-gray-800 sm:px-2 lg:px-6">
              <p className="mb-3 text-lg font-medium uppercase">Certification: </p>
              {certificateArray.map((item, index, array) => (
                <>
                  <div key={index} className="certification-wrapper mt-2 flex flex-wrap">
                    <InputField
                      type="text"
                      onChange={e =>
                        handleChange('Name', e, {
                          index: index
                        })
                      }
                      maxlength="15"
                      value={certificateArray[index]?.Name}
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
                      value={certificateArray[index]?.Organization}
                      label={'Organization'}
                      placeholder="Enter Organization"
                      maxlength="15"
                    />
                    {index === 0 &&
                      array.length === 1 &&
                      (certificateArray[0]?.Name !== '' ||
                        certificateArray[0]?.Organization !== '') && (
                        <XIcon
                          onClick={() => ClearCertifcate(index)}
                          className="h-6 w-6 fill-yellow-500"
                          aria-hidden="true"
                        />
                      )}
                    {array.length !== 1 && (
                      <TrashIcon
                        onClick={() => handleDeleteModel(index)}
                        className="h-6 w-6 fill-yellow-500"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  {index + 1 === array.length && (
                    <div
                      onClick={() => Addcertificate(index)}
                      className={`flex w-32 cursor-pointer items-center justify-center self-center rounded bg-[#FACC15] p-2 px-4 font-bold text-white`}
                    >
                      Add More
                    </div>
                  )}
                </>
              ))}
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
                  router.push(`/user/profile/${state._id}`);
                }}
                className={`mt-2 ml-4 cursor-pointer rounded bg-[#FACC15] p-2 px-4 font-bold text-white`}
              >
                Cancel
              </div>
            </div>
          </div>
        </main>
        {/* <aside className="w-fit">
         
        </aside> */}
      </div>
    </Container>
  );
}
