---
layout:     post
title:      Installing Ubuntu 16.04 on ASUS N550jk (Dual Boot with Windows 10)
summary:    Problems and solutions for Ubuntu 16.04 on ASUS N550jk.
thumbnail:  linux
tags:
 - ubuntu
 - 16.04
 - asus
 - n550jk
 - linux
 - problems
 - fix
 - dual boot
---

Recently I bought a new computer, an [ASUS N550JK][asus], and installed Ubuntu 16.04
alongside Windows 10 on it. On this post I will talk about problems that I faced
while installation process and some solutions for them.

## Setup Your Environment & Boot from Disk

*[If you know how to do this, skip this part.](#problems-and-some-solutions-for-asus)*

First things first, before you start if you want dual boot, you should create
a space for Ubuntu. For this, you can use some 3rd party tools on Windows or
you can use Windows' built-in partition manager as well. I used Windows'
partition manager.

`Right Click on the Start` => `Disk Management`

*To see other methods or step-by-step guide with screen shots [visit here][0]*

In here you should create an [empty partition][1] (Leave it without formatting.)
After that you are ready to install.
And yes there is no need to disable secure boot or trying to reach BIOS etc.

### Booting from Disk Drive

* Before shutdown Windows, place your Ubuntu 16.04 64-bit disk to disk drive
* Open `the Start Menu`
* Click `Power`
* **Hold `Shift` key while clicking on `Restart`.**
* The UEFI menu will be displayed
* In here choose **Use a device** option
* Your PC will boot from disk drive.

## Problems and Some solutions for ASUS

The most of the things work pretty well actually. However, there are some
problems. I listed them here.
These are the problems that I faced after installation, if you have
other problems, I suggest you to check the links on
[this section](#other-sources)
or leave a comment to the comment section below.

### 1. Screen Brightness Keys Don't work

To fix this, you must add `acpi_osi= ` (with the `Space` after `=`)
to your grub defaults.

* Open a terminal
* Open `/etc/default/grub`

~~~
    sudo nano /etc/default/grub
~~~

* Change `GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"`
to `GRUB_CMDLINE_LINUX_DEFAULT="quiet splash acpi_osi= "`
* Update grub

~~~
    sudo update-grub
~~~

* Reboot

*Source: [Askubuntu][fn-keys-question]*

### 2. Stuck in Login Loop

I tried suggested solutions under [this question][login-loop] and only
reinstalling `lightdm` worked for me.

* Open a TTY `Ctrl`+`Alt`+`f3` and login
* Remove `lightdm`

~~~
    sudo apt purge lightdm
~~~

* Reinstall it

~~~
    sudo apt install lightdm
~~~

* Restart your computer

~~~
    reboot
~~~

*Source: [Askubuntu][login-loop]*

### 3. Keyboard Backlight Turns ON Every Boot

I think it is very annoying and none of the solutions that I found on the
Internet worked for me. So, I wrote a login script for `lightdm` to fix this.

**Important:** If you want to fix also full screen brightness problem with
this problem, please create one login script as described under
[this section](#one-login-script-for-screen-brightness-and-keyboard-backlight).

* Open a terminal
* Create a bash script file, I created mine under `/usr/local/sbin` but you
can create yours wherever you want

~~~
    sudo touch /usr/local/sbin/login_kbd_backlight_script.sh
~~~

* Copy and paste the below code on it

~~~
    sudo nano /usr/local/sbin/login_kbd_backlight_script.sh
~~~

* OR download the code and move it to `/usr/local/sbin`

    <script src="https://gist.github.com/onurozuduru/ae61faee0b233b4de55b0fb1ea2cdf69.js?file=login_kbd_backlight_script.sh"></script>

* Make it executable

~~~
    sudo chmod +x /usr/local/sbin/login_kbd_backlight_script.sh
~~~

* Before you go to next step, backup your `lightdm.conf` file

~~~
    sudo cp /etc/lightdm/lightdm.conf /etc/lightdm/lightdm.conf.old
~~~

* Add the line
`session-setup-script=/usr/local/sbin/login_kbd_backlight_script.sh`
on `lightdm.conf`

~~~
    echo "session-setup-script=/usr/local/sbin/login_kbd_backlight_script.sh" | sudo tee -a /etc/lightdm/lightdm.conf
~~~

### 4. Screen Brightness Sets to Full after Boot

Every time I boot the Ubuntu it sets screen brightness as 100%. I first
install xbacklight and I wrote a login script for `lightdm` to fix this.

**Important:** If you want to fix also keyboard backlight problem with
this problem, please create one login script as described under
[this section](#one-login-script-for-screen-brightness-and-keyboard-backlight).

* Open a terminal
* Install `xbacklight`

~~~
    sudo apt install xbacklight
~~~

* Create a bash script file, I created mine under `/usr/local/sbin` but you
can create yours wherever you want

~~~
    sudo touch /usr/local/sbin/login_brightness_script.sh
~~~

* Copy and paste the below code on it

~~~
    sudo nano /usr/local/sbin/login_brightness_script.sh
~~~

* OR download the code and move it to `/usr/local/sbin`

    <script src="https://gist.github.com/onurozuduru/ae61faee0b233b4de55b0fb1ea2cdf69.js?file=login_brightness_script.sh"></script>

* Make it executable

~~~
    sudo chmod +x /usr/local/sbin/login_brightness_script.sh
~~~

* Before you go to next step, backup your `lightdm.conf` file

~~~
    sudo cp /etc/lightdm/lightdm.conf /etc/lightdm/lightdm.conf.old
~~~

* Add the line
`session-setup-script=/usr/local/sbin/login_brightness_script.sh`
on `lightdm.conf`

~~~
    echo "session-setup-script=/usr/local/sbin/login_brightness_script.sh" | sudo tee -a /etc/lightdm/lightdm.conf
~~~

##### One Login Script for Screen Brightness and Keyboard Backlight

To fix keyboard backlight and screen brightness problems at the same time,
create only one login script file. And make it executable. Then add your file
path to `lightdm.conf` file.

There are my script and .conf files.

<script src="https://gist.github.com/onurozuduru/ae61faee0b233b4de55b0fb1ea2cdf69.js?file=login_script.sh"></script>

<script src="https://gist.github.com/onurozuduru/ae61faee0b233b4de55b0fb1ea2cdf69.js?file=lightdm.conf"></script>

For more details about lightdm please see these sites:

* <http://www.mattfischer.com/blog/?p=343>
* <http://ubuntuforums.org/showthread.php?t=1918649>

### 5. Windows 10 Showing Wrong Time

Yes, you installed Ubuntu, you didn't touch any Windows partition but Windows'
time's been broken. Welcome to the Microsoft Land. Here is the solution:

<http://www.techgainer.com/fix-windows-showing-wrong-time-in-linux-windows-dual-boot-system/>

### Other Sources

If you faced other problems than these, the following links might be helpful:

* <http://linux-on-n550.blogspot.com/p/n550jv-issues-and-fixes.html>
* <http://snakelab.cc/2015/01/09/running_ubuntu_on_asus_n550jk.html>

Also for overheating and power management issues please read [this article][overheating].

[0]: http://www.isunshare.com/windows-10/7-ways-to-open-disk-management-in-windows-10.html "How to open Disk Management Tool on Windows 10"
[1]: http://www.digitalcitizen.life/how-manage-your-disks-using-disk-management-utility?page=1 "Using Disk Management Tool"

[fn-keys-question]: https://askubuntu.com/questions/471847/brightness-fn-key-shortcut-doesnt-work-on-asus-laptop "Brightness fn key shortcut doesn't work on ASUS laptop"
[login-loop]: https://askubuntu.com/questions/223501/ubuntu-gets-stuck-in-a-login-loop?page=1&tab=votes#tab-top "Ubuntu gets stuck in a login loop"
[overheating]: http://itsfoss.com/reduce-overheating-laptops-linux/ "Most Effective Ways To Reduce Laptop Overheating In Linux"
[asus]: https://www.asus.com/Notebooks/N550JK/
