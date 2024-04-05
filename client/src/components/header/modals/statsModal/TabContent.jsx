import { Bar } from "react-chartjs-2";
import { formatTime } from "../../../../utils/DateTimeUtils";
import { alphabet } from "../../../../constants/game";
import {
  options,
  defaultData,
} from "../../../../constants/barChart";

const TabContent = ({ personalStats, game }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center gap-5 my-2 mb-3">
        <div className="flex flex-col items-center w-32">
          <span className="text-2xl font-extrabold text-neutral-300">
            {personalStats[game].gamesPlayed}
          </span>
          <span className="text-sm text-neutral-500">Games Played</span>
        </div>
        <div className="flex flex-col items-center w-32">
          <span className="text-2xl font-extrabold text-neutral-300">
            {personalStats[game].errors}
          </span>
          <span className="text-sm text-neutral-500">Total Errors</span>
        </div>
        <div className="flex flex-col items-center w-32">
          <span className="text-2xl font-extrabold text-neutral-300">
            {game !== "unlimited" && personalStats[game].gamesPlayed
              ? formatTime(
                  Math.round(
                    personalStats[game].cumulativeTime /
                      personalStats[game].gamesPlayed
                  )
                )
              : game !== "unlimited"
              ? "N/A"
              : game === "unlimited" && personalStats[game].gamesPlayed
              ? Math.round(
                  personalStats[game].cumulativeCharacters /
                    personalStats[game].gamesPlayed
                )
              : "N/A"}
          </span>
          <span className="text-sm text-neutral-500">
            {game !== "unlimited" ? "Average Time" : "Average Letters"}
          </span>
        </div>
        <div className="flex flex-col items-center w-32">
          <span className="text-2xl font-extrabold text-neutral-300">
            {game !== "unlimited" && personalStats[game].bestTime
              ? formatTime(personalStats[game].bestTime)
              : game !== "unlimited"
              ? "N/A"
              : game === "unlimited" && personalStats[game].bestCharacters
              ? personalStats[game].bestCharacters
              : "N/A"}
          </span>
          <span className="text-sm text-neutral-500">
            {game !== "unlimited" ? "Best Time" : "Most Letters"}
          </span>
        </div>
      </div>
      <Bar
        data={{
          labels: defaultData.labels,
          datasets: [
            {
              ...defaultData.datasets[0],
              data:
                personalStats && personalStats[game]
                  ? Array.from(
                      { length: 26 },
                      (_, index) =>
                        personalStats[game].missedChars?.[alphabet[index]] || 0
                    )
                  : Array(26).fill(0),
            },
          ],
        }}
        options={options}
      />
    </div>
  );
};

export default TabContent;
