const _Environments = {
  development: {
    BASE_URL: `http://localhost:3001`,
    GET_PROFILE: '/user/getUserProfile',
    UPDATE_PROFILE: `/user/updateUserProfile/`,
    ADD_PROFILE_PICTURE: '/user/addUserProfile/'
  }
};

function getEnvironment() {
  const platform = 'development';
  return _Environments[platform];
}

const Environment = getEnvironment();
export default Environment;
