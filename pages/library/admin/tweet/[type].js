import dynamic from "next/dynamic";
import { useState } from "react";
import { Container } from "../../../../components/layout";

const NotificationSuccess = dynamic(() =>
    import("../../../../components/notifications/success")
);
const NotificationError = dynamic(() =>
    import("../../../../components/notifications/error")
);

const Submit = (metaTags) => {
    const [notifySuccess, setNotifySuccess] = useState(false);
    const [notifyError, setNotifyError] = useState(false);

    const [data, setData] = useState({
        id: "",
        category: "project"
    });


    const createTweet = async (event) => {
        event.preventDefault();
        await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/tweets/post`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "id": data.id,
                "category": data.category
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setData({
                        id: "",
                        category: "project"
                    });
                    setNotifySuccess(true);

                }
                else {
                    setData({
                        id: "",
                        category: "project"
                    });
                    setNotifyError(true);
                }
            });

    };


    return (
        <div className="px-6">
            <main className="mx-auto max-w-6xl mb-5 shadow">
                <div className="relative bg-white dark:bg-gray-800 py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-14">
                    <div className=" max-w-3xl mx-auto">
                        <div className="max-w-max prose prose dark:prose-invert mx-auto text-center prose-p:text-lg prose-h1:mb-2">
                            <h1>Post a Tweet</h1>
                        </div>

                        <div className="mt-12">
                            <form
                                action="#"
                                method="POST"
                                className="grid grid-cols-8 gap-y-6 gap-x-8"
                                onSubmit={createTweet}
                            >
                                <div className="col-span-12 lg:col-span-4 sm:col-span-4">
                                    <label
                                        htmlFor="tweet_id"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Tweet ID
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            required
                                            type="number"
                                            name="tweet_id"
                                            id="tweet_id"
                                            value={data.id}
                                            onChange={(e) => setData({ ...data, id: e.target.value })}
                                            className="py-3 px-4 block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border-gray-300 rounded-md dark:bg-gray-400 dark:border-gray-500 dark:text-gray-800"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 lg:col-span-4 sm:col-span-4">
                                    <label
                                        htmlFor="category"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Category
                                    </label>
                                    <div className="mt-1 lg:flex lg:items-center">
                                        <select
                                            onChange={(e) => setData({ ...data, category: e.target.value })}
                                            name="category"
                                            required
                                            className="w-full mr-4 p-2.5 dark:text-gray-800 bg-white border border-gray-300 rounded-md shadow-sm outline-none focus:outline-none appearance-none focus:border-yellow-500">
                                            <option value="">Please Select a Category</option>
                                            <option selected value="project">Project</option>
                                            <option value="developer">Developer</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex max-w-3xl mx-auto justify-end">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-3 px-16 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 dark:text-gray-200 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                    > Save
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <NotificationError
                show={notifyError}
                setShow={setNotifyError}
                text="Posting Failed"
                subText="Please try again"
            />
            <NotificationSuccess
                show={notifySuccess}
                setShow={setNotifySuccess}
                text="Successfully posted!"
                subText="Thank you"
            />
        </div>
    );
}


export default function ContentAdmin({ }) {
    const metaTags = {
        title: "BNB Chain - Library Admin",
        description: "Library Admin",
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin`,
        shouldIndex: false,
    };

    return (
        <Container metaTags={metaTags}>
            <Submit metaTags={metaTags} />
        </Container>
    );
}
