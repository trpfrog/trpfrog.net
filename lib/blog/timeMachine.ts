import {Octokit} from "@octokit/rest";

export type TimeMachineSHA = {
  sha: string
  date: string
}

export const fetchHistorySHA = async (slug: string): Promise<TimeMachineSHA[]> => {
  const key = `${slug}-history-sha`
  if (process.env[key]) {
    process.env[key]!.split(';').map(e => {
      const [sha, date] = e.split(',')
      return {sha, date}
    })
  }

  const octokit = new Octokit({
    auth: `${process.env.GITHUB_TOKEN}`,
  });

  const response = await octokit.request(`GET /repos/TrpFrog/trpfrog.net/commits`, {
    owner: 'TrpFrog',
    repo: 'trpfrog.net',
    path: `/posts/${slug}.md`
  })

  if (response) {
    const data = response.data.map((e: any) => ({
      sha: e.sha,
      date: e.commit.author.date
    })).sort((a: TimeMachineSHA, b: TimeMachineSHA) => {
      return a.date < b.date
    })
    process.env[key] = data.map((e: TimeMachineSHA) => `${e.sha},${e.date}`).join(';')
    return data
  } else {
    process.env[key] = ','
    return []
  }
}
