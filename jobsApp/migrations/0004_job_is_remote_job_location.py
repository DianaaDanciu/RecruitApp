# Generated by Django 4.2.6 on 2023-10-19 09:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('locations', '0002_alter_location_unique_together'),
        ('jobsApp', '0003_job_cover_photo_job_profile_pic'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='is_remote',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AddField(
            model_name='job',
            name='location',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='locations.location'),
        ),
    ]
