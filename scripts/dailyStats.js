/**
 * Author: infinity
 * Name: Daily Stats
 * Description: Displays sp and levels gained since last reset.
 */

(async function () {
	const data = await getUserData();
	const stats = getStatsFromData(data);
	const sp = calcSpValue(stats);

	//set up local storage
	if (localStorage.getItem("dailyStats") === null) {
		const newStats = {
			lastUpdated: "2021-01-01",
			spVal: 0,
			lvl: 0,
		};
		localStorage.setItem("dailyStats", JSON.stringify(newStats));
	}

	//get yesterday's stats
	yesterdayStats = JSON.parse(localStorage.getItem("dailyStats"));

	//build the current date in UTC. JS SUCKS
	const d = new Date();
	const currentUTCDate = `${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDate()}`;

	//if the current date is greater than the last updated date, update the stored stats
	if (currentUTCDate > yesterdayStats.lastUpdated) {
		const newStats = {
			lastUpdated: currentUTCDate,
			spVal: sp,
			lvl: stats.level,
		};
		localStorage.setItem("dailyStats", JSON.stringify(newStats));
	}

	console.log(
		`sp gained: ${sp - yesterdayStats.spVal}, level gained: ${
			stats.level - yesterdayStats.lvl
		}`
	);
})();

async function getUserData() {
	const rawData = await fetch(
		"https://api.dragonsofthevoid.com/api/user/info",
		{
			method: "GET",
			headers: { authorization: localStorage.token },
		}
	);
	const data = await rawData.json();
	return data.payload.user;
}

function getStatsFromData(data) {
	let stats = {
		constitution: 0,
		strength: 0,
		agility: 0,
		intellect: 0,
		perception: 0,
		leadership: 0,
		vitalitycap: 0,
		energycap: 0,
		honorcap: 0,
		level: 0,
	};

	let filteredStats = Object.fromEntries(
		Object.entries(data).filter(([key, value]) => stats.hasOwnProperty(key))
	);

	return filteredStats;
}

function calcSpValue(stats) {
	let sp = 0;

	for (const [stat, value] of Object.entries(stats)) {
		if (stat === "level") {
			sp -= value;
			continue;
		}
		///TODO handle stat values >10000 here
		/*
		Starting at 10k it cost 2.
		10k to 25k every 1.5k it increases cost by 1.

		At 25k it increases by 1 every 1k
		*/

		sp += value;
	}

	return sp;
}
