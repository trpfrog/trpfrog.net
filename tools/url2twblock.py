import bs4
from urllib import request
import json
from dateutil import parser
import pyperclip

url = input().split('?')[0]
api = 'https://publish.twitter.com/oembed?dnt=true&omit_script=true&url='

if url.isdecimal():
    url = 'https://twitter.com/trpfrog/status/' + url 

if url == '' or not url.startswith('https://twitter.com'):
    print('Invalid URL')
    exit(1)

content = ''
with request.urlopen(api + url) as response:
    content = json.loads(response.read().decode('utf-8'))

soup = bs4.BeautifulSoup(content['html'], 'html.parser')

id = url.split('/')[-1]
date = parser.parse(soup.find_all('a')[-1].get_text())
tweet = soup.p
name = content['author_name']
userid = content['author_url'].split('/')[-1]

result = ''
if name == 'つまみ':
    result = f'''```twitter-archived
id: {id}
date: {str(date).split(' ')[0]}
tweet: {tweet.decode_contents(formatter='html').replace('&hellip;', '…')}
```'''
else:
    result = f'''```twitter-archived
id: {id}
name: {name}
userid: {userid}
date: {str(date).split(' ')[0]}
tweet: {tweet.decode_contents(formatter='html').replace('&hellip;', '…')}
```'''


print(result)
pyperclip.copy(result)

