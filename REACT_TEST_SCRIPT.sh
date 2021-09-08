#!/bin/bash
cd [Repo location]
git fetch

for i in $(git rev-list --all); do
        if [ -d "/root/domain-redirector/commits/$i" ]; then
                echo "$i is exists, skipping..."
        else
                cd ~/[Repo Location]
                git reset --hard $i
                rm -rf ~/temp
                mkdir ~/temp
                cp -R ~/[Repo Location]/* ~/temp
                cd ~/temp
                pnpm i
                npm run build
                mkdir ~/domain-redirector/commits/$i
                cp -R ~/temp/build/* ~/domain-redirector/commits/$i
        fi
done
