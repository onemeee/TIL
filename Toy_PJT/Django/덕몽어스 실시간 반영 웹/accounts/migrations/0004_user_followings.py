# Generated by Django 3.2.13 on 2022-10-13 06:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_auto_20221013_1547'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='followings',
            field=models.ManyToManyField(related_name='_accounts_user_followings_+', to='accounts.User'),
        ),
    ]
