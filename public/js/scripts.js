/* eslint-disable @typescript-eslint/no-unused-vars */
async function deleteUser(user) {
  const proceed = prompt(`Are you sure you want to delete ${user} (y/n)`);

  if (proceed && proceed.toLowerCase() === "y") {
    const res = await fetch(`/user/delete/${user}`, {
      method: "DELETE",
    });

    if (res.ok) {
      window.location.href = "/user/all";
    }
  }
}

function navigateToUser(url) {
  window.location.href = url;
}
