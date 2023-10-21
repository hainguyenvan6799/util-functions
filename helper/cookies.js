export function setCookie(name, value, expirydays) {
  var d = new Date();
  d.setTime(d.getTime() + (expirydays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = name + "=" + value + "; " + expires;
}

export function deleteCookie(name){
 setCookie(name,"",-1);
}

export function deleteAllCookies(){
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++)
    deleteCookie(cookies[i].split("=")[0]);
}
