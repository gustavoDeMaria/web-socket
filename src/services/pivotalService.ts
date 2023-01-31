import axios from 'axios';
import { IPivotalResponse } from './interface/IPivotalResponse';

const baseUrl = "https://www.pivotaltracker.com/services/v5/";

export class PivotalService {
    async ObterStory(projetoId: number, storyId: string, api_token: string) : Promise<IPivotalResponse | null> {
        const { data, status } = await axios.get<IPivotalResponse>(`${baseUrl}projects/${projetoId}/stories/${storyId.replace("#","")}`, {
            headers:
            {
                'X-TrackerToken': api_token
            }
        });

        if (status == 200){
            return data;
        }
        else
        {
            return null
        }
    }
}

