# Generated by Django 3.1.5 on 2021-04-11 11:19

import Portfolio.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Portfolio', '0007_auto_20210410_0330'),
    ]

    operations = [
        migrations.CreateModel(
            name='CMessage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(blank=True, max_length=20, null=True)),
                ('message', models.CharField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='work',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('brand_name', models.CharField(max_length=200)),
                ('brand_type', models.CharField(max_length=100)),
                ('description', models.TextField(max_length=1500)),
                ('image', models.ImageField(upload_to=Portfolio.models.uploadWorkImage)),
            ],
        ),
    ]
