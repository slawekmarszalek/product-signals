# Product Signals

A lightweight product intelligence dashboard for tracking open-source developer tools using public GitHub signals.

## Overview

Product Signals aggregates and surfaces key signals from selected OSS repositories. It helps identify trends, compare tools, and monitor ecosystem dynamics.

The project focuses on simplicity and clarity rather than completeness. The goal is to provide directional insights into how developer tools evolve.

## Live Demo

https://product-signals.vercel.app/

## Key Features

* Explore curated OSS developer tools
* Compare stars, forks, and activity
* View latest releases and repository metadata
* Filter and search across tools and categories
* Expand rows for detailed repository insights

## How it works

Data flows through a simple pipeline:

1. GitHub API provides repository data
2. n8n automations collect and process signals
3. Supabase stores and serves structured data
4. Next.js frontend renders and enables exploration

## Tech Stack

* Next.js
* Supabase
* n8n
* GitHub API
* Vercel

## Why I built this

As a Product Manager working on API-first SaaS platforms, I wanted a simple way to track developer tools and emerging trends without manually checking multiple repositories.

This project is an experiment in turning publicly available data into simple, useful product insights.

## Status

MVP, actively evolving.

Planned improvements:

* Trending signals based on stars growth
* Better categorization
* Historical tracking

## Author

Sławomir Marszałek
Product Manager, API-first SaaS

LinkedIn: https://www.linkedin.com/in/slawomir-marszalek/
