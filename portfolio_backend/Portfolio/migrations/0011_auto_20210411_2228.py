# Generated by Django 3.1.5 on 2021-04-11 22:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Portfolio', '0010_work_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cmessage',
            name='message',
            field=models.TextField(max_length=1500),
        ),
    ]
