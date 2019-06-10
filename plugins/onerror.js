try {
  function ignoreerror(err) {
    console.log(err)
    return true
  }

  window.onerror = ignoreerror()
} catch (e) {

}
