# Product Signals

A lightweight product intelligence dashboard for tracking open-source developer tools using public GitHub signals.

It helps identify emerging trends, compare tools, and understand how developer ecosystems evolve without manually analyzing multiple repositories.

## Live Demo

https://product-signals.vercel.app/

## What it does

Product Signals aggregates key signals from selected OSS repositories and presents them in a simple, scannable way.

It is designed to help quickly:
- spot emerging tools and trends  
- compare projects based on activity and adoption  
- explore how developer ecosystems evolve over time  

## Key Features

- Curated list of OSS developer tools  
- Stars, forks, and activity comparison  
- Latest release and repository metadata  
- Search and filtering across tools and categories  
- Expandable rows with detailed repository insights  

## How it works

Data flows through a simple pipeline:

1. GitHub API provides repository data  
2. n8n automations collect and process signals  
3. Supabase stores and serves structured data  
4. Next.js frontend renders and enables exploration  

## Tech Stack

- Next.js  
- Supabase  
- n8n  
- GitHub API  
- Vercel  

## Why I built this

As a Product Manager working on API-first SaaS platforms, I wanted a simple way to track developer tools and emerging trends without jumping between multiple repositories.

This project is an experiment in turning publicly available data into simple, useful product insights.

## Status

MVP, actively evolving.

The current version focuses on directional insights rather than full historical analysis.

Planned improvements:
- Trending signals based on stars growth  
- Better categorization  
- Historical tracking  

## Author

Sławomir Marszałek  
Product Manager, API-first SaaS  

LinkedIn: https://www.linkedin.com/in/slawomir-marszalek/
