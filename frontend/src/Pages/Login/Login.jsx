import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

const Login = () => {
    const baseForm = {
        email: "",
        password: "",
    };
    const [formData, setFormData] = useState(baseForm);

    // Ensures user email is written in {smth}@{smth}.{either edu or com}
    function validateEmail(email) {
        const mail = String(email);
        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(com|edu)$/;
        const validEmail = emailRegex.test(mail);
        return validEmail;
    }

    // Validates form data, then authenticates user
    function handleOnSubmit(e) {
        e.preventDefault();
        // creating ref to submitted data, and clearing state for next time
        const { email, password } = formData;
        setFormData(baseForm);

        // if email not valid, send error toast
        const isEmailValid = validateEmail(email);
        if (!isEmailValid) {
            toast.error("Please enter a \'.edu\' or \'.com\' email")
        }

        // Authenticate user existence in the db

        // User schema: 
        // Email
        // password
        // role
        // If yes, set role to admin and navigate to site
        // If no, display error message
    }

    // Updates formData state as user inputs email and password
    function handleChange(e) {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    return (
        <div className="w-screen h-screen bg-zinc-800 flex flex-col justify-center">
            <Toaster />
            <form
                className="block overflow-auto py-8 px-3 rounded-xl bg-slate-100 m-auto"
                onSubmit={handleOnSubmit}
            >
                <label className="pl-1">Email:</label>
                <br />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className="p-1 rounded-lg mb-3"
                />
                <br />
                <label>Password:</label>
                <br />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="p-1 rounded-lg mb-3"
                />
                <br />
                <button
                    className="bg-zinc-900 hover:bg-zinc-700 ease duration-300 p-2 rounded-full w-full"
                    type="submit"
                >
                    <p>Login</p>
                </button>
            </form>
        </div>
    );
};

export default Login;
