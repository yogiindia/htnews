import axios from 'axios';

const HN_API_URL = `https://hacker-news.firebaseio.com/v0/`;

export const getStoryIds = async () => {
    const ids = await axios.get(`${HN_API_URL}topstories.json`);
    return ids.data;
};

export const getStory = async id => {
    const response = await axios.get(`${HN_API_URL}item/${id}.json`);
    return response.data;
};
