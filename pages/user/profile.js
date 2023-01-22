import { useState } from "react";
import { Container } from "../../components/layout";
import Image from "next/image";
import "react-circular-progressbar/dist/styles.css";
import axios from "../../utils/axios";
import EndPoint from "../../constant/endPoints";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/router";
const tabs = ["Contributions", "Most Popular", "Most Read"];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Profile({ data }) {
    const router = useRouter();
    const metaTags = {
        title: "BNBChainDev - Profile",
        description:
            "Stay up-to-date with the BNBChain ecosystem. BNBChain Projects and Developers in one place.",
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/profile`,
        shouldIndex: true,
    };
    const [selectedTab, setSelectedTab] = useState("Contributions");

    return (
        <Container metaTags={metaTags}>
            <div className="flex w-full gap-3 self-center md:pl-0">
                <main className="">
                    <div className="px-4 sm:px-0">
                        <div className="relative z-0 flex flex-col divide-gray-200 rounded-md bg-white p-2 px-8 py-8 shadow dark:divide-gray-700">
                            <div className="flex flex-row">
                                <div className="m-h-[150px] flex h-fit w-[30%] max-w-[150px] items-center justify-center overflow-hidden rounded-full">
                                    <Image
                                        src={data?.ProfilePicture ? data?.ProfilePicture : "/profilepicture.png"}
                                        width="300px"
                                        height="300px"
                                        className="rounded-full"
                                        alt=""
                                    />
                                </div>
                                <div className="ml-3 mt-6 w-[70%]">
                                    {data?.Username != "" ? (
                                        <p className="mb-2 text-lg font-medium uppercase">
                                            {data?.Username}
                                        </p>
                                    ) : null}
                                    {data?.Country != "" ? (<div className="mt-1 flex flex-row">
                                        <div className="w-4 h-4">
                                            <Image src={"/place.png"} height={"100px"} width={"100px"} alt=""/></div>
                                        <p className="ml-1 text-[12px]">{data?.Country}</p>
                                    </div>) : null}
                                    <div className="mt-1 flex flex-row">
                                        <div className="w-4 h-4">
                                            <Image src={"/time.png"} height={"100px"} width={"100px"} alt=""/></div>
                                        <p className="ml-1 text-[12px]">
                                            Member since,{" "}
                                            {moment(data?.CreatedAt).format("MMMM,YYYY")}
                                        </p>
                                    </div>
                                    {data?.Skils.length > 0 ? (<div className="mt-1 flex flex-row">
                                        <div className="w-4 h-4">
                                            <Image src={"/account.png"} height={"100px"} width={"100px"} alt=""/></div>
                                        {data?.Skils?.map((item, index) => (
                                            <p key={index} className="ml-1 text-[12px]">
                                                {item},
                                            </p>
                                        ))}
                                    </div>) : null}
                                </div>
                                <button
                                    className="ml-2 mb-28 flex w-36 items-center justify-center self-end rounded bg-gradient-to-r from-gray-800 to-gray-600 py-2 px-4 font-bold text-white hover:to-yellow-600"
                                    id="connectButton"
                                    onClick={() => router.push("/user/edit-profile")}
                                >
                                    <p>Edit Profile</p>
                                </button>
                            </div>
                            <div className="mt-5 h-fit">
                                <div className="flex h-fit w-full flex-row flex-wrap justify-between px-4">
                                    <div className="flex h-16 w-36 flex-row">
                                        <div className="h-14 w-14">
                                            <Image src={"/rank.png"} width="250px" height="250px" alt=""/>
                                        </div>
                                        <div className="ml-1">
                                            <p className="text-base font-medium text-black">
                                                {data?.Author?.Rank}
                                            </p>
                                            <p className="font-normal text-slate-400">Rank</p>
                                        </div>
                                    </div>
                                    <div className="flex h-16 w-36 flex-row">
                                        <div className="h-14 w-14">
                                            <Image src={"/read.png"} width="250px" height="250px" alt=""/>
                                        </div>
                                        <div className="ml-1">
                                            <p className="text-base font-medium text-black">
                                                {data?.Author?.Read}
                                            </p>
                                            <p className="font-normal text-slate-400">Read</p>
                                        </div>
                                    </div>
                                    <div className="flex h-16 w-36 flex-row">
                                        <div className="h-12 w-12">
                                            <Image
                                                src={"/reputation.png"}
                                                width="250px"
                                                height="250px"
                                                alt=""
                                            />
                                        </div>
                                        <div className="ml-1">
                                            <p className="text-base font-medium text-black">
                                                {data?.Author?.Reputation}
                                            </p>
                                            <p className="font-normal text-slate-400">Reputation</p>
                                        </div>
                                    </div>
                                    <div className="flex h-16 w-36 flex-row">
                                        <div className="h-12 w-12">
                                            <Image src={"/member.png"} width="250px" height="250px" alt=""/>
                                        </div>
                                        <div className="ml-1">
                                            <p className="text-base font-medium text-black">
                                                {data?.Author?.Member}
                                            </p>
                                            <p className="font-normal text-slate-400">Member</p>
                                        </div>
                                    </div>
                                    <div className="flex h-16 w-36 flex-row">
                                        <div className="h-12 w-12">
                                            <Image src={"/likes.png"} width="250px" height="250px" alt=""/>
                                        </div>
                                        <div className="ml-1">
                                            <p className="text-base font-medium text-black">
                                                {data?.Author?.Like}
                                            </p>
                                            <p className="font-normal text-slate-400">Likes</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-0 mt-2 flex flex-col divide-gray-200 rounded-md bg-white p-2 px-8 py-8 shadow  dark:divide-gray-700">
                            <p className="text-lg font-medium uppercase">Bio: </p>
                            <p className="text-[12px]">{data?.Bio}</p>
                        </div>
                        <div className="bg-white px-4 sm:px-0">
                            <nav
                                className="relative z-0 mt-2 flex divide-gray-200 rounded-lg shadow dark:divide-gray-700"
                                aria-label="Tabs"
                            >
                                {tabs.map((tab, tabIdx) => (
                                    <button
                                        key={tabIdx}
                                        onClick={() => {
                                            setSelectedTab(tab);
                                        }}
                                        className={classNames(
                                            tabIdx === 0 ? "rounded-l-lg" : "",
                                            tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                                            "group relative min-w-0 flex-1 overflow-hidden bg-white py-3 px-6 text-center text-sm font-medium focus:z-10 dark:bg-gray-800  dark:text-gray-200",
                                            tab !== "Releases" &&
                                            "hover:bg-gray-50 dark:hover:bg-gray-700",
                                            tab === "Releases" && "cursor-not-allowed opacity-40"
                                        )}
                                    >
                                        <span
                                            className={classNames(
                                                tab === selectedTab
                                                    ? "text-[#FBCC14]"
                                                    : "text-slate-400"
                                            )}
                                        >
                                            {tab}
                                        </span>

                                        <span
                                            aria-hidden="true"
                                            className={classNames(
                                                tab === selectedTab ? "bg-[#FBCC14]" : "bg-transparent",
                                                "absolute inset-x-0 bottom-0 h-0.5"
                                            )}
                                        />
                                    </button>
                                ))}
                            </nav>
                            <div className="py-5">
                                <div className="flex justify-between">
                                    {selectedTab === "Contributions" && (
                                        <div className="justify-evently flex flex-wrap">
                                            <p className=" ml-6 mt-4 text-base font-bold text-black">
                                                No Record Found
                                            </p>
                                            {/* {data?.Author?.Contributions.map((item, index) => (
                        <div className="ml-2 mt-1 flex  w-56 flex-row items-center">
                          <div className="h-1 w-1 rounded-full bg-stone-400" />
                          <p className="ml-2 text-sm uppercase text-stone-400">
                            {item} [{index}]
                          </p>
                        </div>
                      ))} */}
                                        </div>
                                    )}
                                    {selectedTab === "Most Read" && (
                                        <div className="justify-evently flex flex-wrap">
                                            <p className=" ml-6 mt-4 text-base font-bold text-black">
                                                No Record Found
                                            </p>
                                            {/* {data?.Author?.MostPopular.map((item, index) => (
                        <div className="ml-2 mt-1 flex  w-56 flex-row items-center">
                          <div className="h-1 w-1 rounded-full bg-stone-400" />
                          <p className="ml-2 text-sm uppercase text-stone-400">
                            {item} [{index}]
                          </p>
                        </div>
                      ))} */}
                                        </div>
                                    )}

                                    {selectedTab === "Most Popular" && (
                                        <div className="justify-evently flex flex-wrap">
                                            <p className=" ml-6 mt-4 text-base font-bold text-black">
                                                No Record Found
                                            </p>
                                            {/* {data?.Author?.MostPopular.map((item, index) => (
                        <div className="ml-2 mt-1 flex  w-56 flex-row items-center">
                          <div className="h-1 w-1 rounded-full bg-stone-400" />
                          <p className="ml-2 text-sm uppercase text-stone-400">
                            {item} [{index}]
                          </p>
                        </div>
                      ))} */}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <aside className="w-fit">
                    <div className="block w-full overflow-x-auto">
                        <div className="relative z-0 mt-2 flex flex-col divide-gray-200 rounded-md bg-white p-2 px-8 py-8 shadow dark:divide-gray-700">
                            <p className="mb-3 text-lg font-medium uppercase">
                                Awards & Recognitions:{" "}
                            </p>
                            <div className="flex flex-row items-start justify-start self-start">
                                <div className="m-h-[80px] mr-3 flex h-fit w-[30%] max-w-[80px] items-center justify-center overflow-hidden">
                                    <Image
                                        src={"/employee-of-the-month-selected.png"}
                                        width="300px"
                                        height="300px"
                                        alt=""
                                    />
                                </div>
                                <div className="m-h-[80px] mr-3 flex h-fit w-[30%] max-w-[80px] items-center justify-center overflow-hidden ">
                                    <Image
                                        src={"/mvp-selected.png"}
                                        width="300px"
                                        height="300px"
                                        alt=""
                                    />
                                </div>
                                <div className="m-h-[80px] mr-3 flex h-fit w-[30%] max-w-[80px] items-center justify-center overflow-hidden">
                                    <Image src={"/vip.png"} width="300px" height="300px" alt=""/>
                                </div>
                                <div className="m-h-[80px] mr-3 flex h-fit w-[30%] max-w-[80px] items-center justify-center overflow-hidden">
                                    <Image src={"/speaker.png"} width="300px" height="300px" alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-0 flex flex-col mt-2 divide-gray-200 rounded-md bg-white px-4 py-4 shadow dark:divide-gray-700">
                            <p className="mb-1 text-lg font-medium uppercase">
                                Certification:{" "}
                            </p>

                            {/* Projects table */}
                            {data?.Author?.Certification.length > 0 ? (
                                <table className="w-full border-collapse items-center bg-transparent">
                                    <thead>
                                        <tr>
                                            {["", "Organization", "Name"].map((item, index) => (
                                                <th
                                                    key={index}
                                                    className={
                                                        "whitespace-nowrap border border-l-0 border-r-0 border-solid border-slate-100 bg-[#FACC15] px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-slate-700"
                                                    }
                                                >
                                                    {item}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    {data.Author.Certification.map(item => (
                                        <tbody key={item._id}>
                                            <tr>
                                                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-xs text-black">
                                                    <Image
                                                        src={"/certificate.png"}
                                                        width={"30px"}
                                                        height={"30px"}
                                                        alt=""
                                                    />
                                                </td>

                                                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-xs text-black">
                                                    {item.Organization}
                                                </td>
                                                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-xs text-black">
                                                    {item.Name}
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                            ) : (
                                <div className="flex h-full w-64 items-center py-4 px-8">
                                    <p className="text-sm font-bold text-black">
                                        No Record Available
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="mt-2 flex flex-row justify-between">
                            <div className="relative z-0 flex w-[49%] flex-col items-center justify-center divide-x divide-gray-200 rounded-md bg-white p-2 px-8 py-8 shadow dark:divide-gray-700">
                                <p className="text-lg font-medium">Social Links:</p>
                                <div className="flex flex-row">
                                    <Link
                                        href={
                                            data?.Author?.SocialLinks.length != 0 && data?.Author?.SocialLinks[0]?.Link != undefined
                                                ? data?.Author?.SocialLinks[0]?.Link
                                                : "#"
                                        }
                                    >
                                        <div className="mr-2 h-8 w-8 hover:cursor-pointer">
                                            <Image
                                                src={"/facebook.png"}
                                                width="250px"
                                                height="250px"
                                                alt=""
                                            />
                                        </div>
                                    </Link>
                                    <Link
                                        href={
                                            data?.Author?.SocialLinks.length != 0 && data?.Author?.SocialLinks[1]?.Link != undefined
                                                ? data?.Author?.SocialLinks[1]?.Link
                                                : "#"
                                        }
                                    >
                                        <div className="mr-2 h-8 w-8 hover:cursor-pointer">
                                            <Image
                                                src={"/linkedin.png"}
                                                width="250px"
                                                height="250px"
                                                alt=""
                                            />
                                        </div>
                                    </Link>
                                    <Link
                                        href={
                                            data?.Author?.SocialLinks.length != 0 && data?.Author?.SocialLinks[2]?.Link != undefined
                                                ? data?.Author?.SocialLinks[2]?.Link
                                                : "#"
                                        }
                                    >
                                        <div className="mr-2 h-8 w-8 hover:cursor-pointer">
                                            <Image
                                                src={"/twitter.png"}
                                                width="250px"
                                                height="250px"
                                                alt=""
                                            />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="relative z-0 flex w-[49%] flex-col items-center justify-center divide-x divide-gray-200 rounded-md bg-white p-2 shadow  dark:divide-gray-700">
                                <p className="text-lg font-medium">Author:</p>
                                <div className="flex flex-row">
                                    <div className="mr-2 h-8 w-8 hover:cursor-pointer">
                                        <Image
                                            src={"/icons8-add-friend-58.png"}
                                            width="250px"
                                            height="250px"
                                            alt=""
                                        />
                                    </div>
                                    <div className="mr-2 h-8 w-8 hover:cursor-pointer">
                                        <Image
                                            src={"/icons8-certification-64.png"}
                                            width="250px"
                                            height="250px"
                                            alt=""
                                        />
                                    </div>
                                    <div className="mr-2 h-8 w-8 hover:cursor-pointer">
                                        <Image
                                            src={"/icons8-graph-64.png"}
                                            width="250px"
                                            height="250px"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </Container>
    );
}

export async function getServerSideProps(context) {
    let response;
    const userToken = context.req.cookies.userToken;
    // .req.cookies.get('userToken');
    let user = JSON.parse(userToken);
    try {
        response = await axios.get(`${EndPoint.BASE_URL}${EndPoint.GET_PROFILE}/${user.data?._id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + user.token
            }
        });
    } catch (error) {
        console.log(error);
    }
    return {
        props: {
            data: response?.data?.data
        }
    };
}