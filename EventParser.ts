interface Match {
    sport: string;
    participant1?: string;
    participant2?: string;
    score?: string | string[][];
}

export class EventParser {
    makeEventName(match: Match): string {
        const { sport, participant1, participant2 } = match;
        if (['soccer', 'volleyball', 'basketball'].includes(sport)) {
            return `${participant1} - ${participant2}`;
        } else if (['tennis', 'handball'].includes(sport)) {
            return `${participant1} vs ${participant2}`;
        } else {
            return "Exception: invalid sport";
        }
    }

    formatScore(match: Match): string {
        const { sport, score } = match;
        if (sport === 'soccer' || sport === 'handball') {
            return score as string;
        } else if (sport === 'tennis' || sport === 'volleyball') {
            const scores = /([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+)/.exec(score as string);
            if (scores) {
                const [mainScore, set1, set2, set3] = scores.slice(1);
                return `Main score: ${mainScore} (set1 ${set1}, set2 ${set2}, set3 ${set3})`;
            }
        } else if (sport === 'basketball') {
            const [set1, set2] = (score as string[][]).map(set => set.join(','));
            return `${set1},${set2}`;
        }
        return "Exception: invalid sport";
    }
}

const matchesData: Match[] = [
    {
        sport: 'soccer',
        participant1: 'Chelsea',
        participant2: 'Arsenal',
        score: '2:1',
    },
    {
        sport: 'volleyball',
        participant1: 'Germany',
        participant2: 'France',
        score: '3:0,25:23,25:19,25:21',
    },
    {
        sport: 'handball',
        participant1: 'Pogoń Szczeciń',
        participant2: 'Azoty Puławy',
        score: '34:26',
    },
    {
        sport: 'basketball',
        participant1: 'GKS Tychy',
        participant2: 'GKS Katowice',
        score: [
            ['9:7', '2:1'],
            ['5:3', '9:9']
        ],
    },
    {
        sport: "tennis",
        participant1: 'Maria Sharapova',
        participant2: 'Serena Williams',
        score: '2:1,7:6,6:3,6:7',
    },
    {
        sport: "ski jumping",
    }
];

const matchesParsedData: { name: string, score: string }[] = matchesData.map(match => {
    const parser = new EventParser();
    const name = parser.makeEventName(match);
    const score = parser.formatScore(match);
    return { name, score };
}).filter(({ name, score }) => name !== 'Exception: invalid sport' && score !== 'Exception: invalid sport');

console.log(matchesParsedData);
