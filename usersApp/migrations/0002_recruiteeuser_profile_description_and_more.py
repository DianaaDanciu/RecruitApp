# Generated by Django 4.2.6 on 2023-10-14 13:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usersApp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='recruiteeuser',
            name='profile_description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='recruiteeuser',
            name='school',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='recruiteeuser',
            name='university',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='recruiteeuser',
            name='work_experience',
            field=models.TextField(blank=True, null=True),
        ),
    ]
