import subprocess
import time

p = subprocess.Popen(
    ['ssh', '-p', '443', '-R0:localhost:5173', 'a.pinggy.io', '-o', 'StrictHostKeyChecking=no'],
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True
)

time.sleep(5)
p.terminate()

out, err = p.communicate()
print("STDOUT:", out)
print("STDERR:", err)
