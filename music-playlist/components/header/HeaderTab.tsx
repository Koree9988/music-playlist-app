"use client";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export const HeaderTab = () => {
  const { theme } = useTheme(); // ✅ destructure here
  const router = useRouter();

  const handleClick = () => {
    router.push("/"); // navigate to your target page
  };
  return (
    <div className="flex flex-row place-content-between my-auto p-2">
      <div className="text-center px-4 cursor-pointer" onClick={handleClick}>
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "32px" }}
        >
          music_note
        </span>
      </div>
      <div className="flex flex-row gap-x-4 items-center mx-8">
        <span
          className="material-symbols-outlined text-gray-400 cursor-pointer"
          onClick={handleClick}
          style={{ fontSize: "28px" }}
        >
          home
        </span>

        {/* <div
          className="rounded-xl px-4 w-[400px]"
          style={{
            backgroundColor: theme === "light" ? "#ededed" : "#0a0a0a",
            color: theme === "light" ? "#0a0a0a" : "#ededed",
          }}
        >
          Hello
        </div> */}

        <button className="bg-white text-sm font-semibold text-black px-3 py-1 rounded-2xl">
          Explore Premium
        </button>

        <button className="text-sm font-semibold px-3 py-1 rounded-2xl">
          Install App
        </button>

        <span
          className="material-symbols-outlined text-gray-400"
          style={{ fontSize: "28px" }}
        >
          notifications
        </span>

        <span
          className="material-symbols-outlined text-gray-400"
          style={{ fontSize: "36px" }}
        >
          account_circle
        </span>
      </div>
    </div>
  );
};
