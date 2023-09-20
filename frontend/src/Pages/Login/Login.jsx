import { Form } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    function handleOnSubmit(e) {
        // Validate that the email ends in .something
            // Don't know what kind of emails 
        // If valid, send to next step
        // If not valid, tell user

        // Encrypt password before sending over to backend

        // Authenticate user existence in the db
        // If yes, set role to admin and navigate to site
        // If no, display error message
        console.log("We have submitted");
        console.log(formData);
        console.log(e.target[0].value);
    }

    function handleChange(e) {
        const { key, value } = e.target;

        setFormData({
            ...formData,
            [key]: value,
        });
    }

    return (
        <div className="w-screen h-screen bg-zinc-800 flex flex-col justify-center">
            <form
                className="block overflow-auto py-8 px-3 rounded-xl bg-slate-100 m-auto"
                onSubmit={handleOnSubmit}
            >
                <label>Email:</label>
                <br />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <br />
                <label>Password:</label>
                <br />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <br />
                <button
                    className="bg-zinc-800 p-3 rounded-full mt-4"
                    type="submit"
                >
                    <p>Login</p>
                </button>
            </form>
        </div>
    );
};

export default Login;
