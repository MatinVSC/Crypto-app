import toast from "react-hot-toast";
import { BASE_URL } from "../utils/baseUrl";
import { getUserSession } from "../utils/useSession";


// get user data
export async function getUserData() {
  const userSession = getUserSession();

    try {
        const response = await fetch(`${BASE_URL}/user`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "key": userSession
            },
        });

        if (!response.ok) {
            toast.error("Error processing the request. Please try again later.")
        }

        const userData = await response.json();        
        return userData;

    } catch (error) {
        throw new Error(error.message);
    }
};


export async function getUpdateUser({ email = "", currentPassword: password, newPassword = "" }) {
  const userSession = getUserSession();
  
    try {
      const response = await fetch(`${BASE_URL}/updatei`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "key": userSession,
        },
        body: JSON.stringify({email, password, newPassword})
      });
  
      console.log("Response Status:", response.status);
      console.log("Response Headers:", [...response.headers.entries()]);
  
      const updateUser = await response.json();
      console.log("Response Data:", updateUser);
  
      if (!response.ok) {
        console.error("API Error:", updateUser);
        toast.error("Error processing the request. Please try again later.");
      }
  
      return updateUser;
    } catch (error) {
      console.error("Network Error:", error.message);
      throw new Error(error.message);
    }
  }
  



// export async function getUpdateUser({ email = "", currentPassword: CurrentPassword, newPassword = "" }) {
//   console.log("Request Data:", {
//     email: String(email),
//     CurrentPassword: String(CurrentPassword),
//     newPassword: String(newPassword),
//   });
  

//   try {
//     const response = await axios.post(
//       `${BASE_URL}/updatei`,
//       {
//         email: "reaza@gmail.com",
//         CurrentPassword: "bbb123123", // یا CurrentPassword یا current_password
//         newPassword: "bbb1231234",
//       },
//       {
//         headers: {
//           "Content-type": "application/json",
//           key: userSession,
//         },
//       }
//     );

//     console.log("Response Status:", response.status);
//     console.log("Response Data:", response.data);

//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       console.error("Response Error:", error.response.data);
//       console.error("Response Status:", error.response.status);
//       toast.error(error.response.data?.message || "Error processing the request.");
//     } else if (error.request) {
//       console.error("Request Error:", error.request);
//       toast.error("No response from the server. Please try again later.");
//     } else {
//       console.error("Error:", error.message);
//       toast.error(error.message);
//     }

//     throw error;
//   }
// };


