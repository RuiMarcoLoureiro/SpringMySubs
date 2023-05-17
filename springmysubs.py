from re import sub
import re
from turtle import title
from flask import Flask, jsonify
app = Flask(__name__)
import requests
from bs4 import BeautifulSoup

@app.route('/')
def hello_world():
    return 'Hello world !'

def get_price(ticker):
    if ticker == 'DISNEY':
        URL = 'https://www.disneyplus.com/fr-ch'
        page = requests.get(URL)
        soup = BeautifulSoup(page.content, 'html.parser')
        results = soup.find_all(class_="accordion-child")
        #keep only the 3rd element of the list
        price = results[2]
        
        #keep only the number
        price = price.text.strip()
        price = sub(r'[^\d.]', '', price)
        
        #keep the 5 first characters
        price = price[:5]
        
        return float(price)
    
    if ticker == 'NFLX':
        URL = 'https://www.netflix.com/ch-fr/'
        page = requests.get(URL)
        soup = BeautifulSoup(page.content, 'html.parser')
        results = soup.find(id="content--nmhp-card-faq-accordion--1")
        
        results = results.text.strip()
        
        #keep only the number
        results = sub(r'[^\d.]', '', results)
        
        #remove the 1st character of the string
        results = results[1:]
        
        #keep the 5 first characters
        results = results[:5]

        
        return float(results)
            
        
    elif ticker == 'SPOT':
        URL = 'https://www.spotify.com/ch-fr/premium/'
        page = requests.get(URL)
        soup = BeautifulSoup(page.content, 'html.parser')
        results = soup.find(id='spoti-root')
        subscription_elements = results.find_all('div', class_='sc-kGVuwA sc-eCbnUT gyERj kJPMCW')
        for subscription_element in subscription_elements:
            #title_element = subscription_element.find('h3', class_='Type__TypeElement-goli3j-0 clxiCC sc-fkmfBh jJpdDo')
            price_element = subscription_element.find('p', class_='sc-irqbAE kxZWSs')
            price = sub(r'[^\d.]', '', price_element.text.strip())
            #remove the 1st character of the string
            price = price[1:]
            #convert string to float
            price = float(price)
            return price
            

@app.route('/getPrice/<ticker>')
def getPrice(ticker):
    return get_price(ticker)

@app.route('/getAllPrices')
def getAllPrices():
    disney = get_price('DISNEY')
    spotify = get_price('SPOT')
    netlix = get_price('NFLX')
    
    return jsonify({'disney': disney, 'spotify': spotify, 'netflix': netlix})