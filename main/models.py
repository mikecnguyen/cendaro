# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.utils import timezone
import datetime
from django.db import models

class User(models.Model):
    email = models.CharField(max_length=100, primary_key=True)
    password = models.CharField(max_length=50, default='')
    first_name = models.CharField(max_length=50, default='')
    last_name = models.CharField(max_length=50, default='')
    phone = models.CharField(max_length=15, default='')
    created_date = models.DateTimeField(default=timezone.now, blank=True)
    is_active = models.IntegerField(default=1) #1: Active, 0: Inactive

from mongoengine import *

mongo_connection = connect('cendaro', host='mongodb://127.0.0.1:27017/cendaro')

class User(Document):
    email = EmailField(required=True)
    password = StringField(required=True)
    first_name = StringField(max_length=50)
    last_name = StringField(max_length=50)
    phone = StringField(max_length=15)
    created_date = DateTimeField(default=datetime.datetime.now, blank=True)

class Home(Document):
    property_id = IntField(required=True)
    address = StringField(required=True)
    city = StringField(max_length=50)
    state = StringField(max_length=20)
    zip_code = IntField(max_length=7)
    full_addr = StringField()
    geolocation = GeoPointField()
    price = StringField(max_length=50)
    bed = StringField(max_length=10)
    bath = StringField(max_length=10)
    year_built = IntField()
    sqft = IntField()
    lot_size = IntField()
    property_type = StringField(max_length=20)
    property_status = StringField(max_length=10)
    cooling = StringField(max_length=15)
    heating = StringField(max_length=15)
    parking = IntField()
    image = ListField()
    description = StringField()
    posted_date = DateTimeField(default=datetime.datetime.now, blank=True)
