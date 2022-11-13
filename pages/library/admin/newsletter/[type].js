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
    const [data, setData] = useState({
        Title: "",
        Author: "",
//        Img: "",
        ContentMarkdown: "",
        Description: ""
    });
    const [notifySuccess, setNotifySuccess] = useState(false);
    const [notifyError, setNotifyError] = useState(false);

    const createNewsletter = async (event) => {
        event.preventDefault();
        const key = localStorage.getItem("PublicKey");
        const formData = new FormData();
        formData.append("Title", data.Title);
        formData.append("Author", data.Author);
//        formData.append("Img", data.Img);
        formData.append("ContentMarkdown", data.ContentMarkdown);
        formData.append("Description", data.Description);

        await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/bnb/newsletters`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': key
            },
            body: JSON.stringify({
                "Title": data.Title,
                "Author": data.Author,
//                "Img": "https://binance.ghost.io/content/images/2022/10/wide-2--7-.jpg",
                "ContentMarkdown": data.ContentMarkdown,
                "Description": data.Description
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setData({
                        Title: "",
                        Author: "",
//                        Img: "",
                        ContentMarkdown: "",
                        Description: ""
                    });
                    setNotifySuccess(true);
                }
                else {
                    setData({
                        Title: "",
                        Author: "",
//                        Img: "",
                        ContentMarkdown: "",
                        Description: ""
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
                            <h1>Post newsletter</h1>
                        </div>

                        <div className="mt-12">
                            <form
                                action="#"
                                method="POST"
                                className="grid grid-cols-8 gap-y-6 gap-x-8"
                                onSubmit={createNewsletter}
                            >
                                <div className="col-span-12 lg:col-span-6 sm:col-span-4">
                                    <label
                                        htmlFor="title"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Title
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            required
                                            type="text"
                                            name="title"
                                            id="title"
                                            value={data.Title}
                                            onChange={(e) => setData({ ...data, Title: e.target.value })}
                                            className="py-3 px-4 block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border-gray-300 rounded-md dark:bg-gray-400 dark:border-gray-500 dark:text-gray-800"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 lg:col-span-6 sm:col-span-4">
                                    <label
                                        htmlFor="author-name"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Author
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="author-name"
                                            id="author-name"
                                            value={data.Author}
                                            autoComplete="given-name"
                                            onChange={(e) => setData({ ...data, Author: e.target.value })}
                                            className="py-3 px-4 block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border-gray-300 rounded-md dark:bg-gray-400 dark:border-gray-500 dark:text-gray-800"
                                        />
                                    </div>
                                </div>

{/*
                                <div className="col-span-12 lg:col-span-6 sm:col-span-4">
                                    <label
                                        htmlFor="author-name"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Image
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="file"
                                            name="author-image"
                                            id="author-image"
                                            value={data.Img}
                                            onChange={(e) => setData({ ...data, Img: e.target.files[0] })}
                                            className="py-3 px-4 block w-full shadow-sm border bg-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 border-gray-300 rounded-md dark:bg-gray-400 dark:border-gray-500 dark:text-gray-800"
                                        />
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500 text-gray-500">
                                        Upload image
                                    </p>
                                </div>
*/}
                                <div className="col-span-12 lg:col-span-12 sm:col-span-4">
                                    <label
                                        htmlFor="long_description"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Brief Explanation
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="long_description"
                                            name="long_description"
                                            required
                                            rows={4}
                                            value={data.Description}
                                            onChange={(e) => setData({ ...data, Description: e.target.value })}
                                            className="py-3 px-4 block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border border-gray-300 rounded-md dark:bg-gray-400 dark:border-gray-500 dark:text-gray-800"
                                        />
                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                                            Brief description about the content. ~100 characters
                                        </p>
                                    </div>
                                </div>

                                <div className="col-span-12 lg:col-span-12 sm:col-span-4">
                                    <label
                                        htmlFor="content_markdown"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Long Description
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="content_markdown"
                                            name="content_markdown"
                                            required
                                            rows={4}
                                            value={data.ContentMarkdown}
                                            onChange={(e) => setData({ ...data, ContentMarkdown: e.target.value })}
                                            className="py-3 px-4 block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 border border-gray-300 rounded-md dark:bg-gray-400 dark:border-gray-500 dark:text-gray-800"
                                        />
                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                                            Brief description about the content. ~20000 characters
                                        </p>
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
