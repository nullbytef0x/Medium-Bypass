Medium Payroll Bypass

## Description
This project aims to create a tool that can bypass the payroll of the medium payroll system. We will use https://freedium.cfd/ for the bypass. Our goal is to create an browser extension that can redirect the user from original URL to the bypass URL with end section after the domain name. Then extension need to identify and get the Orginal url from the search bar and redirect the user with bypass url with paramters. (Need to replace original URL's domain name with freedium.cfd).

example:
```
    Orginal URL: https://hackersatty.medium.com/maximize-your-bug-bounty-earnings-automate-endpoint-discovery-find-high-impact-vulnerabilities-c9a530445e97 
                or 
                if the URL is https://medium.com/maximize-your-bug-bounty-earnings-automate-endpoint-discovery-find-high-impact-vulnerabilities-c9a530445e97

    Bypass URL:  https://freedium.cfd/maximize-your-bug-bounty-earnings-automate-endpoint-discovery-find-high-impact-vulnerabilities-c9a530445e97
```

## Features required
- Redirect the user from original URL to the bypass URL.
- Identify and get the Orginal url from the search bar.
- Replace original URL's domain name with freedium.cfd.
- Need to display "Bypass Medium" when user right click on the page.
- Need to create extension popup to bypass the URL to confirm the user to bypass the URL if right method is not used.
- need to identify the URL part from the original URL and replace the domain name with freedium.cfd.

I have added image that how need to show the Bypass Medium in the right click menu.![right click Screensho](<Screenshot 2025-05-19 233513.png>)
