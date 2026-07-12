# UsefulBlog Web
This is the web project of [Useful IT Blog](https://dev-lr.com), built with Next.js 16

Renders blog posts fetched from GitHub, with a custom Markdown renderer, and displays comments via [Utterances](https://utteranc.es)

## Project Overview

> This diagram is generated with Claude

<img src="https://github.com/user-attachments/assets/038d8510-4c9b-47b6-a1cf-c78435f942fc" width="70%" />

- UI - Pages and Server Components, built with the Next.js App Router
- API Endpoints - Route handlers that expose post list / data as REST endpoints
- Util - GitHub CDN parser that fetches post data from [UsefulBlog_Data](https://github.com/yymin1022/UsefulBlog_Data)
- Comments are handled by Utterances, which communicates directly with [UsefulBlog_Comments](https://github.com/yymin1022/UsefulBlog_Comments)

## Get Started
1. Clone this repository on your local environment
```bash
   yong@ubuntu-server ~/ :$ git clone https://github.com/yymin1022/UsefulBlog.git
```
2. Install dependencies, and run the development server
```bash
   yong@ubuntu-server ~/ :$ cd UsefulBlog
   yong@ubuntu-server ~/UsefulBlog/ :$ npm install
   yong@ubuntu-server ~/UsefulBlog/ :$ npm run dev
```
3. Build for production
```bash
   yong@ubuntu-server ~/UsefulBlog/ :$ npm run build
   yong@ubuntu-server ~/UsefulBlog/ :$ npm run start
```

## Team Members
| [유용민](https://github.com/yymin1022) |
|---|
| <img src="https://github.com/GDSC-CAU/Vridge-Android/assets/62137001/1904f22f-6086-4bc9-8a9d-2f6875b117fe" width="150" /> |
| Web |
| Developer |

## Screenshots
<p align="left">
  <img src="https://github.com/user-attachments/assets/daaf8220-3afd-4012-a08a-9a5ae7630068" width=70%>
  <img src="https://github.com/user-attachments/assets/c13ad9dd-ac78-4d1f-ae9d-98433d1584dd" width=70%>
  <img src="https://github.com/user-attachments/assets/1d010858-c44a-40c7-97de-007920ea7788" width=70%>
</p>

## Useful links
- [Useful IT Blog](https://dev-lr.com)
- [GitHub](https://github.com/yymin1022)
- [Instagram](https://instagram.com/useful_min)
- [LinkedIn](https://linkedin.com/in/yymin1022)
