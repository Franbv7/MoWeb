export function NewUser() {
  return (
    <>
      <h1>New user</h1>
      <form action="">
        <fieldset>
          <label htmlFor="nick">
            <input type="text" placeholder="Nick" required />
          </label>
        </fieldset>

        <fieldset>
          <label htmlFor="mail1">
            <input type="email" placeholder="Mail" required />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="mail2">
            <input type="email" placeholder="Repeat mail" />
          </label>
        </fieldset>

        <fieldset>
          <label htmlFor="pass1">
            <input type="password" placeholder="Password" required />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="pass2">
            <input
              type="password"
              placeholder="Repeat your passwird"
              required
            />
          </label>
        </fieldset>
      </form>
    </>
  );
}
