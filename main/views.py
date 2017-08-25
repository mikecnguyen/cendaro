# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.template.loader import get_template

def index(request):
    template = get_template('index.html')
    html = template.render({'name': 'mike'}, request)
    return HttpResponse(html)

def homes(request):
    template = get_template('homes.html')
    html = template.render({'name': 'mike'}, request)
    return HttpResponse(html)

def for_sale(request):
    template = get_template('for_sale.html')
    html = template.render({'name': 'mike'}, request)
    return HttpResponse(html)