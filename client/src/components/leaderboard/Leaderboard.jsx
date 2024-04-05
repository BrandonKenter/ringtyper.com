import { faHourglassStart, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { formatTime } from "../../utils/DateTimeUtils";
import CountdownTimer from "./CountdownTimer";
import PaginatedTable from "./PaginatedTable";

const Leaderboard = ({
  currentGame,
  leaderboards,
  newestPRRank,
  newestGRRank,
  leaderboardLoading,
}) => {
  const [populationRecordTab, setPopulationRecordTab] = useState("personal");
  const columns = React.useMemo(
    () => [
      {
        Header: "Rank",
        accessor: "rank",
        Cell: ({ row }) =>
          row.index !== 0 ? (
            row.index + 1
          ) : (
            <FontAwesomeIcon className="text-sm" icon={faTrophy} />
          ),
        width: 40,
      },
      {
        Header: "User",
        accessor: "user",
      },
      {
        Header: currentGame === "unlimited" ? "Letters" : "Time",
        accessor: currentGame === "unlimited" ? "characters" : "time",
        width: 100,
        Cell: ({ row }) =>
          currentGame === "unlimited" ? (
            <span>{row.original.characters}</span>
          ) : (
            <span>{formatTime(row.original.time)}</span>
          ),
      },
      {
        Header: "Errors",
        accessor: "errors",
        width: 80,
      },
      {
        Header: "Accuracy",
        accessor: "accuracy",
        width: 80,
        Cell: ({ row }) => (
          <span>{parseFloat(row.original.accuracy).toFixed(2)}%</span>
        ),
      },
    ],
    [leaderboards]
  );

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col items-center max-w-5xl">
        <div className="flex gap-2 bg-neutral-900 py-2 px-2 rounded-t-md text-neutral-300 font-semibold">
          <span
            onClick={() => setPopulationRecordTab("personal")}
            className={`${
              populationRecordTab === "personal"
                ? "bg-neutral-700"
                : "hover:bg-neutral-700 hover:bg-opacity-60"
            } py-1 px-2 rounded-md cursor-pointer transition duration-300`}
          >
            Personal Leaderboard
          </span>
          <span
            onClick={() => setPopulationRecordTab("global")}
            className={`${
              populationRecordTab === "global"
                ? "bg-neutral-700"
                : "hover:bg-neutral-700 hover:bg-opacity-60"
            } py-1 px-2 rounded-md cursor-pointer transition duration-300`}
          >
            Global Leaderboard
          </span>
        </div>
        <div className="flex flex-col items-center bg-neutral-900 rounded-md p-5 w-full max-w-5xl gap-1 shadow-neutral-900 shadow-lg">
          <div className="text-neutral-400 mb-4 font-extrabold flex flex-col items-center">
            <FontAwesomeIcon className="text-lg" icon={faHourglassStart} />
            <CountdownTimer />
          </div>
          {populationRecordTab === "personal" ? (
            <PaginatedTable
              columns={columns}
              data={leaderboards[currentGame].personal}
              newRecord={newestPRRank}
              leaderboardLoading={leaderboardLoading}
            />
          ) : (
            <PaginatedTable
              columns={columns}
              data={leaderboards[currentGame].global}
              newRecord={newestGRRank}
              leaderboardLoading={leaderboardLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
