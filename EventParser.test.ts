import { EventParser } from './EventParser';

describe('EventParser', () => {
    let parser: EventParser;

    beforeEach(() => {
        parser = new EventParser();
    });

    it('should correctly parse event name for soccer', () => {
        const match = {
            sport: 'soccer',
            participant1: 'Chelsea',
            participant2: 'Arsenal',
            score: '2:1',
        };
        expect(parser.makeEventName(match)).toBe('Chelsea - Arsenal');
    });

     it('should correctly parse event name for soccer', () => {
        const match = {
            sport: 'volleyball',
            participant1: 'Germany',
            participant2: 'France',
            score: '3:0,25:23,25:19,25:21',
        };
        expect(parser.makeEventName(match)).toBe('Germany - France');
    });
});