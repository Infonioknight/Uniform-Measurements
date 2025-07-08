import { useCookies } from "react-cookie";

export function userAuthService() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "mbmJwtToken",
    "mbmUserData",
    "mbmCourseData",
    "userData",
  ]);

  function setUserDataInCookies(userData, userToken, courseData='') {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 3 * 60 * 60 * 1000);
    setCookie("mbmUserData", userData, {
      path: "/",
      expires: expirationDate,
    });

    setCookie("mbmJwtToken", userToken, { path: "/", expires: expirationDate });

    setCookie("mbmCourseData", courseData, {
      path: "/",
      expires: expirationDate,
    });
  }

  function setUserLogin(userData) {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 3 * 60 * 60 * 1000);
    setCookie("mbmUserData", userData, {
      path: "/",
      expires: expirationDate,
    });
  }

  function setAdminDataInCookies(userData, userToken) {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 3 * 60 * 60 * 1000);
    setCookie("mbmUserData", userData, {
      path: "/",
      expires: expirationDate,
    });

    setCookie("mbmJwtToken", userToken, { path: "/", expires: expirationDate });
  }

  function getUserData() {
    const user = cookies.mbmUserData ? cookies.mbmUserData : null;
    return user;
  }

  function getUserToken() {
    const token = cookies.mbmJwtToken || null;
    return token;
  }

  function getUserCourseData() {
    const courseData = cookies.mbmCourseData ? cookies.mbmCourseData : null;
    return courseData;
  }


  function removeUserData(){
    removeCookie("mbmJwtToken");
    removeCookie("mbmUserData");
    removeCookie("userData");
    removeCookie("mbmCourseData");
  }
  function isUserLogin(){
    const userToken = getUserToken();
    if(userToken == null){
        return false;
    }else{
        return true;
    }
  }

  function isAdminLogin(){
    const userToken = getUserToken();
    if(userToken == null){
        return false;
    }
    else{
        return true;
    }
  }
  return {
    setUserDataInCookies,
    getUserData,
    getUserToken,
    getUserCourseData,
    isUserLogin,
    removeUserData,
    setAdminDataInCookies,
    isAdminLogin,
    setUserLogin,
  };
}
