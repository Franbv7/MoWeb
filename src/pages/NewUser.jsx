// // import { useEffect } from "react";
// // import { Header } from "../components/Header";
// // import { useStateContext } from "../context/stateContext";
// // import { registerUser } from "../services/index";
// // export function NewUser() {
// //   const { API_KEY, language, darkMode } = useStateContext();

// //   useEffect(() => {
// //     const form = document.getElementById("registrationForm");

// //     const handleSubmit = async (event) => {
// //       event.preventDefault();

// //       let username = document.getElementById("username").value;
// //       let password = document.getElementById("password").value;

// //       if (username && password) {
// //         const sessionId = await registerUser(username, password, API_KEY);

// //         if (sessionId) {
// //           alert("Registro exitoso!");
// //           console.log("Session ID:", sessionId);
// //         } else {
// //           alert("Error en el registro.");
// //         }
// //       } else {
// //         alert("Por favor completa todos los campos.");
// //       }
// //     };

// //     if (form) {
// //       form.addEventListener("submit", handleSubmit);
// //     }

// //     // Cleanup function to remove event listener when component unmounts
// //     return () => {
// //       if (form) {
// //         form.removeEventListener("submit", handleSubmit);
// //       }
// //     };
// //   }, []);
// //   return (
// //     <>
// //       <Header />
// //       <h1>New user</h1>
// //       <form id="registrationForm">
// //         <fieldset>
// //           <label htmlFor="nick">
// //             <input
// //               type="text"
// //               id="username"
// //               name="username"
// //               required
// //               placeholder="User Name"
// //             />
// //           </label>
// //         </fieldset>

// //         <fieldset>
// //           <label htmlFor="mail1">
// //             <input
// //               type="email"
// //               id="email"
// //               name="email"
// //               required
// //               placeholder="Email"
// //             />
// //           </label>
// //         </fieldset>
// //         <fieldset>
// //           <label htmlFor="mail2">
// //             <input
// //               type="email"
// //               id="email2"
// //               name="email2"
// //               required
// //               placeholder="Repeate your email"
// //             />
// //           </label>
// //         </fieldset>

// //         <fieldset>
// //           <label htmlFor="pass1">
// //             <input
// //               type="password"
// //               id="password"
// //               name="password"
// //               required
// //               placeholder="Password"
// //             />
// //           </label>
// //         </fieldset>
// //         <fieldset>
// //           <label htmlFor="pass2">
// //             <input
// //               type="password"
// //               id="password2"
// //               name="password2"
// //               required
// //               placeholder="Repeat your password"
// //             />
// //           </label>
// //         </fieldset>
// //         <button type="submit">Registrar</button>
// //       </form>
// //     </>
// //   );
// // }

// import { useEffect } from "react";
// import { Header } from "../components/Header";
// import { useStateContext } from "../context/stateContext";
// import { registerUser } from "../services/index";

// export function NewUser() {
//   const { API_KEY, setUser } = useStateContext();

//   useEffect(() => {
//     const form = document.getElementById("registrationForm");

//     const handleSubmit = async (event) => {
//       event.preventDefault();

//       let username = document.getElementById("username").value;
//       let email = document.getElementById("email").value;
//       let email2 = document.getElementById("email2").value;
//       let password = document.getElementById("password").value;
//       let password2 = document.getElementById("password2").value;

//       if (email !== email2) {
//         alert("Los correos electrónicos no coinciden.");
//         return;
//       }

//       if (password !== password2) {
//         alert("Las contraseñas no coinciden.");
//         return;
//       }

//       if (username && email && password) {
//         const sessionId = await registerUser(username, password, API_KEY);

//         if (sessionId) {
//           alert("Registro exitoso!");
//           setUser({ username, sessionId }); // Guardar el usuario en el contexto
//           console.log("Session ID:", sessionId);
//         } else {
//           alert("Error en el registro.");
//         }
//       } else {
//         alert("Por favor completa todos los campos.");
//       }
//     };

//     if (form) {
//       form.addEventListener("submit", handleSubmit);
//     }

//     return () => {
//       if (form) {
//         form.removeEventListener("submit", handleSubmit);
//       }
//     };
//   }, [API_KEY, setUser]);

//   return (
//     <>
//       <Header />
//       <h1>New user</h1>
//       <form id="registrationForm">
//         <fieldset>
//           <label htmlFor="nick">
//             <input
//               type="text"
//               id="username"
//               name="username"
//               required
//               placeholder="User Name"
//             />
//           </label>
//         </fieldset>

//         <fieldset>
//           <label htmlFor="mail1">
//             <input
//               type="email"
//               id="email"
//               name="email"
//               required
//               placeholder="Email"
//             />
//           </label>
//         </fieldset>
//         <fieldset>
//           <label htmlFor="mail2">
//             <input
//               type="email"
//               id="email2"
//               name="email2"
//               required
//               placeholder="Repeat your email"
//             />
//           </label>
//         </fieldset>

//         <fieldset>
//           <label htmlFor="pass1">
//             <input
//               type="password"
//               id="password"
//               name="password"
//               required
//               placeholder="Password"
//             />
//           </label>
//         </fieldset>
//         <fieldset>
//           <label htmlFor="pass2">
//             <input
//               type="password"
//               id="password2"
//               name="password2"
//               required
//               placeholder="Repeat your password"
//             />
//           </label>
//         </fieldset>
//         <button type="submit">Registrar</button>
//       </form>
//     </>
//   );
// }
import { useEffect } from "react";
import { Header } from "../components/Header";
import { useStateContext } from "../context/stateContext";
import { createRequestToken } from "../services/index";

export function NewUser() {
  const { API_KEY } = useStateContext(); // Asegúrate de que API_KEY sea tu Bearer Token

  useEffect(() => {
    const form = document.getElementById("registrationForm");

    const handleSubmit = async (event) => {
      event.preventDefault();

      let username = document.getElementById("username").value;
      let email = document.getElementById("email").value;
      let email2 = document.getElementById("email2").value;
      let password = document.getElementById("password").value;
      let password2 = document.getElementById("password2").value;

      if (email !== email2) {
        alert("Los correos electrónicos no coinciden.");
        return;
      }

      if (password !== password2) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      if (username && email && password) {
        const requestToken = await createRequestToken(API_KEY); // Usar el Bearer Token

        if (requestToken) {
          // Redirigir al usuario para autorizar el token
          const redirectUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=https://mo-web-ten.vercel.app/approved`;
          window.location.href = redirectUrl;
        } else {
          alert("Error al crear el token de solicitud.");
        }
      } else {
        alert("Por favor completa todos los campos.");
      }
    };

    if (form) {
      form.addEventListener("submit", handleSubmit);
    }

    return () => {
      if (form) {
        form.removeEventListener("submit", handleSubmit);
      }
    };
  }, [API_KEY]);

  return (
    <>
      <Header />
      <h1>New user</h1>
      <form id="registrationForm">
        <fieldset>
          <label htmlFor="nick">
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder="User Name"
            />
          </label>
        </fieldset>

        <fieldset>
          <label htmlFor="mail1">
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Email"
            />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="mail2">
            <input
              type="email"
              id="email2"
              name="email2"
              required
              placeholder="Repeat your email"
            />
          </label>
        </fieldset>

        <fieldset>
          <label htmlFor="pass1">
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Password"
            />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="pass2">
            <input
              type="password"
              id="password2"
              name="password2"
              required
              placeholder="Repeat your password"
            />
          </label>
        </fieldset>
        <button type="submit">Registrar</button>
      </form>
    </>
  );
}
