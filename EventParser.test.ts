import { EventParser } from './EventParser';

describe('EventParser', () => {
    let parser: EventParser;

    beforeEach(() => {
        parser = new EventParser();
    });

    it('should correctly parse data for soccer', () => {
        const match = {
            sport: 'soccer',
            participant1: 'Chelsea',
            participant2: 'Arsenal',
            score: '2:1',
        };

        const name = parser.makeEventName(match);
        const score = parser.formatScore(match);

        expect(name).toBe('Chelsea - Arsenal');
        expect(score).toBe('2:1');
    });

    it('should correctly parse data for volleyball', () => {
        const match = {
            sport: 'volleyball',
            participant1: 'Germany',
            participant2: 'France',
            score: '3:0,25:23,25:19,25:21',
        };

        const name = parser.makeEventName(match);
        const score = parser.formatScore(match);
        
        expect(name).toBe('Germany - France');
        expect(score).toBe('Main score: 3:0 (set1 25:23, set2 25:19, set3 25:21)');
    });

    it('should correctly parse data for handball', () => {
        const match = {
            sport: 'handball',
            participant1: 'Pogoń Szczeciń',
            participant2: 'Azoty Puławy',
            score: '34:26',
        };

        const name = parser.makeEventName(match);
        const score = parser.formatScore(match);
        
        expect(name).toBe('Pogoń Szczeciń vs Azoty Puławy');
        expect(score).toBe('34:26');
    });

    it('should correctly parse data for basketball', () => {
        const match = {
            sport: 'basketball',
            participant1: 'GKS Tychy',
            participant2: 'GKS Katowice',
            score: [
                ['9:7', '2:1'],
                ['5:3', '9:9']
            ],
        };

        const name = parser.makeEventName(match);
        const score = parser.formatScore(match);
        
        expect(name).toBe('GKS Tychy - GKS Katowice');
        expect(score).toBe('9:7,2:1,5:3,9:9');
    });

    it('should correctly parse data for tennis', () => {
        const match = {
            sport: 'tennis',
            participant1: 'Maria Sharapova',
            participant2: 'Serena Williams',
            score: '2:1,7:6,6:3,6:7',
        };

        const name = parser.makeEventName(match);
        const score = parser.formatScore(match);
        
        expect(name).toBe('Maria Sharapova vs Serena Williams');
        expect(score).toBe('Main score: 2:1 (set1 7:6, set2 6:3, set3 6:7)');
    });
});